browser.action.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
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

    await browser.tabs.create({ url, pinned: true, windowId: window.id });
  }});
