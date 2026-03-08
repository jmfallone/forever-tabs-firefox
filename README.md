# Forever Tabs

A Firefox extension that makes pinned tabs work the way they should.

## The Problem

Firefox's built-in pinned tabs are unreliable. They only restore in the first window you open on startup, and if that window isn't the last one you close, your pinned tabs vanish on the next launch. Open a second window? No pinned tabs. It's half-baked.

**This is how pinned tabs should work:** you tell the browser which sites you always want open, and they show up — in every window, every time, no exceptions.

That's what Forever Tabs does.

## What It Does

- You configure a list of URLs once
- Every new browser window opens with those URLs as pinned tabs
- Your default new tab page is preserved and focused — pinned tabs appear alongside it, not instead of it
- If you close or unpin a forever-tab in a window, that's fine — it won't be forced back. But the next window you open will still have the full set
- Handles session restore gracefully — no duplicate tabs

## Install

This extension is not yet on the Firefox Add-ons store. To install it manually:

1. Open Firefox and navigate to `about:debugging`
2. Click **"This Firefox"** in the left sidebar
3. Click **"Load Temporary Add-on..."**
4. Select the `manifest.json` file from this repo

The extension will remain loaded until you restart Firefox. For persistent installation, the extension would need to be signed and published on [addons.mozilla.org](https://addons.mozilla.org).

## Usage

1. Click the **Forever Tabs** pin icon in the toolbar (or go to the extension's options via `about:addons`)
2. Add URLs you want pinned in every window (e.g. `https://mail.google.com`, `https://github.com`)
3. Open a new window — your forever-tabs are there, pinned and ready

## How It Works

The extension is intentionally simple:

- **`background.js`** — Listens for new windows via `browser.windows.onCreated`. Reads the URL list from `browser.storage.local`, creates a pinned tab for each one, skips any that are already pinned (session restore), and refocuses the default new tab page.
- **`options.html/js/css`** — A minimal settings page to add and remove URLs.
- **`manifest.json`** — Manifest V3, targeting Firefox 109+. Requires `tabs` and `storage` permissions.

## Permissions

| Permission | Why |
|------------|-----|
| `tabs` | To create pinned tabs and check for existing ones |
| `storage` | To persist your list of forever-tab URLs |

No data leaves your browser. The URL list is stored locally.

## Requirements

- Firefox 109 or later (Manifest V3 support)

## License

MIT
