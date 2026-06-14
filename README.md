# LE Settings — WordPress site operations

Single **site operations** layer for logicencoder.com — security hardening, Telegram alerts, SEO and crawler policy, bot vs human tracking, maintenance mode, and redirect rules in one admin menu.

Private plugin: [logicencoder/le-settings-plugin](https://github.com/logicencoder/le-settings-plugin).

## The problem it solves

WordPress sites accumulate one-off security snippets, SEO tweaks, and alert hooks across theme functions and random mu-plugins. LE Settings centralizes operator controls and exposes **`le_get_settings()`** for the Logic Encoder theme and sibling plugins.

## Security and access

- Login failure alerts and brute-force lockout to Telegram
- Block author enumeration (`?author=`) and related hardening
- Session termination tool for compromised accounts
- Optional content-protection behaviors (theme cooperates)

## SEO and crawlers

Homepage meta description coordination, robots.txt behavior, bot vs visitor tracking on requests, 404 handling hooks. Complements (does not replace) the dedicated sitemap manager plugin.

## Maintenance and redirects

Custom **503 maintenance** page for visitors while admins stay logged in. Redirect rule engine for legacy URL cleanup.

## Admin UI

Top-level **Logic Encoder** menu with tabbed settings: Telegram, Protection, SEO & Bots, Tracking, Redirects, System/Diagnostics.

No external backend — pure WordPress. Pairs with [logic-encoder-theme](https://github.com/logicencoder/logic-encoder-theme) and other LE plugins.

See [REPOS.md](REPOS.md).

---

**Made by [Logic Encoder](https://logicencoder.com)** · [GitHub](https://github.com/logicencoder) · [Contact](https://logicencoder.com/contact/)
