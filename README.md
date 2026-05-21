# LE Settings — public overview

Site-wide **operations and security** plugin for [logicencoder.com](https://logicencoder.com): alerts, hardening, SEO helpers, and traffic visibility.

**Code (private):** [le-settings-plugin](https://github.com/logicencoder/le-settings-plugin)

---

## The problem

A public WordPress site with custom crypto tooling attracts bots, login attacks, and unexpected plugin changes. Spread configuration across many files makes it hard to answer:

- Who tried to log in while you were away?  
- Is the homepage meta description still within Google’s useful length?  
- Should AI crawlers be allowed in `robots.txt`?  
- Is the site accidentally indexing pagination pages?

**LE Settings** centralizes these operational concerns in one admin experience and optional **Telegram** notifications.

---

## Not the shop plugin

| Plugin | Responsibility |
|--------|----------------|
| **le-settings-plugin** (here) | Security, SEO ops, monitoring, maintenance |
| **le-shop-plugin** | Product catalogue for Telegram store |
| **le-crypto-app-store** | Payments and file delivery on SOL |

---

## Capabilities (useful content)

### Telegram alert matrix

**What:** Dozens of independent toggles: successful/failed login, brute-force lockout, new user registration, new post, comments (including spam), core/plugin updates, 404s, PHP errors, plugin activate/deactivate, etc. Optional rate limit (e.g. max 20 messages per interval).

**Why:** Real-time awareness without watching access logs. Throttling prevents alert storms during brute-force waves.

**Who benefits:** Solo operator maintaining LogicEncoder; faster reaction to compromise attempts.

### Brute-force lockout

**What:** After configurable failed attempts from an IP, further logins are blocked for N minutes; whitelist IPs never blocked; optional progressive escalation.

**Why:** Reduces load on server and risk of credential guessing without installing a separate security plugin for basic cases.

**Who benefits:** Site integrity; legitimate users on whitelisted office IPs unaffected.

### Maintenance mode

**What:** Visitors receive HTTP 503 with a customizable message; administrators continue to use wp-admin.

**Why:** Upgrade plugins or theme safely; communicate downtime clearly to SEO crawlers (503 vs soft 200).

**Who benefits:** Operator during deploys; visitors understand the site is temporarily unavailable.

### Homepage SEO description

**What:** Dedicated field for meta description with live character counter targeting 150–160 characters.

**Why:** Homepage is the brand landing page; correct length improves click-through in search results.

**Who benefits:** SEO visitors from Google; operator tuning messaging without editing theme files.

### Crawler & AI bot policy

**What:** Large editable list of User-Agent names (search engines, social preview bots, SEO tools, AI crawlers). Controls how robots.txt treats them and how incoming requests are classified in bot logging.

**Why:** Operator may want search indexing but controlled AI training crawlers, or explicit allows for Telegram/Google preview bots.

**Who benefits:** Operator balancing visibility vs data licensing concerns.

### Bot and visitor logging

**What:** Stores recent bot hits and human visits in database tables with configurable retention caps.

**Why:** Understand traffic composition (Ahrefs vs human) when debugging spikes or SEO changes.

**Who benefits:** Operator diagnosing “why is CPU high” without external analytics for raw request classes.

### Login hardening extras

**What:** Honeypot field on login form, block author-archive enumeration (`?author=1`), optional security headers (X-Frame-Options, etc.), IP blacklist always blocked.

**Why:** Layered cheap defenses that stop a large fraction of automated abuse.

**Who benefits:** All authenticated users indirectly (less compromised site risk).

### Redirect rules

**What:** JSON-defined redirect map managed in admin.

**Why:** Fix renamed URLs or campaign paths without nginx edits on shared hosting.

**Who benefits:** Marketing links and bookmarks to old paths still work.

### Session termination tool

**What:** Admin can force-logout all sessions for a given user id (AJAX).

**Why:** Incident response when an account may be compromised.

**Who benefits:** Operator during security incidents.

---

## Related repositories

[REPOS.md](REPOS.md)

---

**Made by [logicencoder](https://github.com/logicencoder)**
