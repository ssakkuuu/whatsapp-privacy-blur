# WhatsApp Web Privacy Blur

Blurs your WhatsApp Web chat list, message bubbles, chat header (name +
participant list), media/stickers, and system announcements — so nothing
private is visible over your shoulder. Hover any single item to peek at it,
or click one button to reveal (or re-hide) everything at once.

This is two small pieces that work together:

| File | What it does | Installed with |
|---|---|---|
| `whatsapp-privacy-blur.user.css` | Does the actual blurring | [Stylus](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) — install from [userstyles.world](https://userstyles.world/style/30413) or this repo |
| `whatsapp-privacy-toggle.user.js` | Adds an eye-icon button next to the chat-list menu (⋮) that reveals/hides everything | [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |

The CSS works fine on its own (hover-to-reveal only). The script is optional
but adds the one-click toggle.

## Install

You need both browser extensions below. Either works in Chrome, Brave, or
Edge.

### 1. Install Stylus
Get it from the [Chrome Web Store](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne).

### 2. Add the blur style
Pick whichever is easiest for you:

- **Easiest — userstyles.world:** open [userstyles.world/style/30413](https://userstyles.world/style/30413) and click **Install**. Stylus picks it up automatically, and this option also lets Stylus check for future updates on its own.
- **GitHub link:** click **[whatsapp-privacy-blur.user.css](https://raw.githubusercontent.com/ssakkuuu/whatsapp-privacy-blur/main/whatsapp-privacy-blur.user.css)**. Stylus should pop up an "Install style" page automatically — click **Install**.
- **Manual:** open Stylus's dashboard → **Write new style** → **Write new style as UserCSS** (checkbox at the top) → paste the file's contents → **Save**.

### 3. Install Tampermonkey
Get it from the [Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).

### 4. Add the toggle button
Click this link: **[whatsapp-privacy-toggle.user.js](https://raw.githubusercontent.com/ssakkuuu/whatsapp-privacy-blur/main/whatsapp-privacy-toggle.user.js)**

Tampermonkey should open an install page automatically. Click **Install**.

If nothing happens: open Tampermonkey's dashboard → the **+** tab → delete
the default template → paste the file's contents → save with `Ctrl+S`.

### 5. Refresh
Reload `web.whatsapp.com`. You should see:
- The chat list, message bubbles, chat header, and announcements blurred.
- Hovering over any one of them reveals just that item.
- A small eye icon next to the chat-list menu (⋮). Click it to reveal
  everything at once; click again to re-blur.

## Notes
- Your reveal/hide choice is remembered between page reloads.
- Only the message bubbles, chat header, and announcements respond to the
  eye-icon toggle. The chat list and media/stickers always use hover-to-reveal.
- Everything runs entirely in your own browser. No data leaves your machine.

## Changelog
- **1.1.0** — Message bubbles, chat header, and system announcements are now
  blurred (previously just message text and media). Blur amount is driven
  by a CSS variable so the toggle script can control it.
- **1.0.0** — Initial release: chat list, media, and stickers blurred;
  message text blurred with hover-to-reveal.
