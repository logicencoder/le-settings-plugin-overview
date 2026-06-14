# LE Settings — WordPress site operations

Single **site operations** configuration layer for logicencoder.com — security, Telegram alerts, SEO and crawler policy, bot tracking, maintenance mode, and redirects. Exposes **`le_get_settings()`** for the Logic Encoder theme and sibling plugins.

Private plugin: [logicencoder/le-settings-plugin](https://github.com/logicencoder/le-settings-plugin).

## Security and access control

- Telegram notifications on successful login and failed attempts
- Brute-force lockout after repeated failures
- Block author enumeration via `?author=` probes
- **`le_terminate_sessions`** AJAX — kill all sessions for a compromised user
- Plugin activate/deactivate and core upgrade notifications to Telegram

## SEO and crawlers

Homepage meta description coordination with the theme. Custom robots.txt behavior, bot vs human visitor tracking on each request, structured 404 handling. Works alongside [logicencoder-sitemap-manager-plugin](https://github.com/logicencoder/logicencoder-sitemap-manager-plugin-overview) — settings here handle meta and crawler policy; sitemap manager owns XML generation.

## Maintenance and redirects

Custom **503 maintenance page** for anonymous visitors while admins remain logged in. Redirect rule engine for legacy URL cleanup without nginx edits.

## Content protection

Optional content-protection behaviors (theme cooperates) — reduce casual copy/paste scraping on selected material.

## Admin UI

Top-level **Logic Encoder** menu with tabbed sections:

| Tab | Controls |
|-----|----------|
| Telegram | Bot token, chat ID, alert toggles |
| Protection | Login limits, enumeration blocks |
| SEO & Bots | Meta, robots, bot detection |
| Tracking | Visitor vs bot classification |
| Redirects | Source → target rules |
| System | Diagnostics, save/reset |

Settings saved via secure POST on `admin_init` — no external backend.

See [REPOS.md](REPOS.md).

---

**Made by [Logic Encoder](https://logicencoder.com)** · [GitHub](https://github.com/logicencoder) · [Contact](https://logicencoder.com/contact/)
