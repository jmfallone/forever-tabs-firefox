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

## Build

```bash
./build.sh
```

This creates `forever-tabs-<version>.zip`, ready to upload to [addons.mozilla.org](https://addons.mozilla.org) or install manually.

## Install

**From zip:**

1. Run `./build.sh` to generate the zip
2. Open Firefox → `about:addons` → gear icon → **"Install Add-on From File..."**
3. Select the generated `.zip` file

**For development:**

1. Open Firefox → `about:debugging` → **"This Firefox"**
2. Click **"Load Temporary Add-on..."**
3. Select `manifest.json` from this repo

Temporary add-ons are removed when Firefox restarts. For persistent installation, publish the zip to [addons.mozilla.org](https://addons.mozilla.org).

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
