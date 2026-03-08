const form = document.getElementById("add-form");
const input = document.getElementById("url-input");
const list = document.getElementById("tab-list");

async function render() {
  const { foreverTabs } = await browser.storage.local.get({ foreverTabs: [] });
  list.innerHTML = "";
  for (const url of foreverTabs) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = url;
    li.appendChild(span);

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.className = "remove";
    btn.addEventListener("click", () => removeUrl(url));
    li.appendChild(btn);

    list.appendChild(li);
  }
}

async function addUrl(url) {
  const { foreverTabs } = await browser.storage.local.get({ foreverTabs: [] });
  if (foreverTabs.includes(url)) return;
  foreverTabs.push(url);
  await browser.storage.local.set({ foreverTabs });
  render();
}

async function removeUrl(url) {
  const { foreverTabs } = await browser.storage.local.get({ foreverTabs: [] });
  await browser.storage.local.set({
    foreverTabs: foreverTabs.filter((u) => u !== url),
  });
  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = input.value.trim();
  if (url) {
    addUrl(url);
    input.value = "";
  }
});

render();
