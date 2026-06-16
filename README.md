# LE Settings — WordPress plugin

Central **site operations** console for logicencoder.com — security hardening, Telegram alerts, crawler-aware request logging, maintenance mode, and WordPress housekeeping in one wp-admin home. Operators configure behaviour once; front-end effects (lockouts, headers, 503 page, bot vs human logging) apply on every request without a separate SaaS panel.

The plugin is **not** the Telegram app shop ([le-shop-plugin](https://github.com/logicencoder/le-shop-plugin-overview)), not the crypto store backend, and not the full analytics dashboard ([wp-visitor-stats-plugin](https://github.com/logicencoder/wp-visitor-stats-plugin-overview)). It is the lightweight **operator control plane** that sits beside the Logic Encoder theme and sibling plugins.

## Tech stack

| Layer | Technologies |
|-------|--------------|
| WordPress plugin | PHP single-file (`le-settings.php`, ~4.2k LOC), inline admin CSS/JS |
| Persistence | WordPress options (`le_settings` blob) + MySQL log tables |
| Alerts | Telegram Bot API (`sendMessage`, HTML), optional geo line via ip-api.com |
| Security | Login hooks, transients, IP CIDR matching, optional response headers |
| Logging | `{prefix}le_bot_log`, `{prefix}le_visitor_log`, `{prefix}le_bf_log` |
| Integration | `le_get_settings()` for theme and LE plugins; AJAX admin tools |
| Hosting | WordPress on shared hosting; wp-admin only (no public shortcode UI) |

## Telegram alert matrix

When enabled, the worker sends formatted messages to a configured bot chat. A master switch, bot token, and chat ID gate all traffic; an hourly throttle caps alert storms during incidents.

Alerts are grouped in wp-admin checklists so operators enable only what they need:

| Group | Examples |
|-------|----------|
| **Security** | Successful login, logout, failed login, brute-force lockout, password reset, role change, user deleted |
| **Content** | New registration, post published or updated, media upload, comment / approved / spam |
| **System** | Core auto-update success, plugin activated / deactivated / deleted, 404 hit, PHP fatal on shutdown |

Each message can append a **geo line** (country and city from the client IP) when geo lookup is enabled. A **Test message** button verifies credentials without waiting for a real event.

## Protection and login hardening

The **Protection** tab concentrates defences around `wp-login.php` and session hygiene:

- **Brute-force lockout** — counts failures per IP in a short window; exceeds threshold → timed lockout stored in options and the security log. Progressive tiers can multiply lockout duration for repeat offenders.
- **IP whitelist** — CIDR-aware list that skips brute-force tracking and visitor logging for trusted nets (office, VPN exit).
- **IP blacklist** — returns HTTP 403 for listed ranges before WordPress renders the page.
- **Login honeypot** — hidden field bots often fill; submission aborts authentication.
- **User enumeration block** — tightens author-archive probes and trims public REST user endpoints that leak usernames.
- **Security headers** — optional `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy` on front-end responses.
- **Session manager** — lists users with active sessions; **kill all sessions** for a compromised account via AJAX.

Failed attempts, lockouts, and manual unblocks appear in the **Security Log** tab with badges and one-click unblock.

## Maintenance and WordPress operations

**Maintenance mode** serves a custom **503** page with `Retry-After` to anonymous visitors while administrators retain wp-admin access — useful during deploys without touching nginx.

**WordPress auto-updates** toggles can re-enable core, plugin, and theme auto-update UI suppressed by Hostinger mu-plugins when operators want unattended security patches.

The **Debug** tab mirrors `WP_DEBUG`, `WP_DEBUG_LOG`, and `WP_DEBUG_DISPLAY` into `wp-config.php` when the file is writable, and streams the tail of `debug.log` in admin for incident triage.

## Bot and visitor tracking

On each front-end request the plugin classifies traffic using an editable **bot user-agent list** (major crawlers, monitors, and AI bots). Matches go to **Bot Log**; humans go to **Visitor Log** unless skipped (localhost, private IPs, whitelisted nets, optional skip for logged-in users).

Each row stores timestamp, URL, IP, parsed OS/browser/device, referrer, and logged-in username when applicable. Retention caps prune old rows; **CSV export** and **clear** actions live on the log tabs. Sensitive fields can be masked in the admin table view.

This is intentionally lighter than wp-visitor-stats (no heatmaps or session replay) — enough signal for security review and crawler volume without duplicating the full analytics product.

## SEO, redirects, and content policy (admin)

The **SEO & Bots** tab holds homepage meta description (with character counter), pagination noindex preference, AI/crawler bot allow rules, and the live bot UA list that drives classification.

The **Redirects** tab edits a JSON table of source paths with **301**, **302**, or **410** targets. The **Protection** section also exposes content-policy toggles (guest redirects from member paths, excerpt hiding for premium tags, robots hints on protected pages).

**Integration note (v2.1.8):** redirect rules, several SEO toggles, and content-protection switches are **saved in `le_settings`** for theme and sibling plugins to consume via `le_get_settings()`. Runtime hooks for every toggle are not all wired inside this file yet — homepage SEO copy on the public site still flows primarily through the [Logic Encoder theme](https://github.com/logicencoder/logic-encoder-theme-overview) Customizer. Document honestly: this plugin is the configuration source; front-end behaviour depends on the active integration layer.

## Admin console layout

Top-level wp-admin menu **Logic Encoder** (shield icon, early sidebar position). Header cards summarise bots logged, visitors logged, and failed logins today. Nine tabs:

| Tab | Purpose |
|-----|---------|
| **Telegram** | Credentials, throttle, 22 notification toggles, test send |
| **Protection** | Brute force, sessions, honeypot, IP lists, maintenance, auto-updates |
| **SEO & Bots** | Meta description field, bot UA list, tracking toggles, pagination noindex |
| **Redirects** | 301/302/410 rule table |
| **Bot Log** | Crawler analytics bars, paginated table, CSV export |
| **Visitor Log** | Human traffic, top countries, paginated table, CSV export |
| **Security Log** | Login attempts, lockouts, manual unblock and IP purge |
| **Debug** | WP_DEBUG triad + live log viewer |
| **Status** | Feature grid, notification grid, site info (WP/PHP/SSL/cron) |

Settings save through a secured POST on the configuration tabs; log and status tabs use AJAX actions instead of the main save button.

## Sibling products

| Product | Relationship |
|---------|----------------|
| [logicencoder-sitemap-manager-plugin](https://github.com/logicencoder/logicencoder-sitemap-manager-plugin-overview) | XML sitemaps and index — complementary |
| [logicencoder-login-system-plugin](https://github.com/logicencoder/logicencoder-login-system-plugin-overview) | Branded login and member flows |
| [logic-encoder-theme](https://github.com/logicencoder/logic-encoder-theme-overview) | Public layout and Customizer SEO strings |
| [le-shop-plugin](https://github.com/logicencoder/le-shop-plugin-overview) | Telegram Mini App catalogue — separate product |
| [wp-visitor-stats-plugin](https://github.com/logicencoder/wp-visitor-stats-plugin-overview) | Deep visitor analytics — separate product |

Private code: [le-settings-plugin](https://github.com/logicencoder/le-settings-plugin)

See [REPOS.md](REPOS.md).

---

**Made by [Logic Encoder](https://logicencoder.com)** · [GitHub](https://github.com/logicencoder) · [Contact](https://logicencoder.com/contact/)
