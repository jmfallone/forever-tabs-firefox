browser.action.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});

// Maps tab IDs to their original config URL so we can detect redirects
const tabToConfigUrl = new Map();

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (!changeInfo.url || !tabToConfigUrl.has(tabId)) return;

  const configUrl = tabToConfigUrl.get(tabId);
  if (changeInfo.url === configUrl) return;

  // The tab redirected — update the stored URL in foreverTabs
  const { foreverTabs } = await browser.storage.local.get({ foreverTabs: [] });
  const index = foreverTabs.indexOf(configUrl);
  if (index === -1) return;

  foreverTabs[index] = changeInfo.url;
  await browser.storage.local.set({ foreverTabs });

  // Update our in-memory tracking
  tabToConfigUrl.set(tabId, changeInfo.url);
});

browser.windows.onCreated.addListener(async (window) => {
  const { foreverTabs } = await browser.storage.local.get({ foreverTabs: [] });
  if (foreverTabs.length === 0) return;

  // Wait briefly for the window's default tab to be created
  await new Promise((r) => setTimeout(r, 100));

  const existingTabs = await browser.tabs.query({ windowId: window.id });

  for (const url of foreverTabs) {
    // Skip if this URL is already open and pinned in the window
    const alreadyOpen = existingTabs.some(
      (tab) => tab.pinned && tab.url && tab.url.startsWith(url)
    );
    if (alreadyOpen) continue;

    const created = await browser.tabs.create({
      url,
      pinned: true,
      windowId: window.id,
    });
    tabToConfigUrl.set(created.id, url);
  }

  // Refocus the default new tab page so it's the active tab
  const allTabs = await browser.tabs.query({ windowId: window.id });
  const defaultTab = allTabs.find((tab) => !tab.pinned);
  if (defaultTab) {
    await browser.tabs.update(defaultTab.id, { active: true });
  }
});
