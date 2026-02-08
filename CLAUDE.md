# CLAUDE.md - Cross Care Group Website

## Project Overview

Static HTML/CSS/JavaScript website for Cross Care Group, an Australian healthcare and community care provider. No backend server — forms submit directly to Microsoft Power Automate workflows via SAS-protected URLs. Hosted on SiteGround with FTP-based deployment.

## Tech Stack

- **HTML5** — 39 static pages, semantic markup
- **CSS** — Custom CSS (`styles/main.css`) + Tailwind CSS (built via CLI, output to `styles/tailwind.css`)
- **JavaScript** — Vanilla JS (no frameworks), 6 modules in `js/`
- **Fonts** — Google Fonts (Inter, Playfair Display)
- **Forms** — Microsoft Power Automate endpoints (config in `js/config.js`)
- **Hosting** — SiteGround (Apache), deployed via GitHub Actions → FTP
- **Analytics** — Google Tag Manager

## Directory Structure

```
├── js/                    # JavaScript modules
│   ├── config.js          # API endpoints, auth config, security settings
│   ├── forms.js           # Form submission engine (IIFE pattern)
│   ├── auth.js            # OIDC/PKCE authentication (ES6 class)
│   ├── script.js          # DOM interactions, animations, observers
│   ├── blog.js            # Blog content data + search/filtering
│   └── app.js             # General interactivity
├── styles/
│   ├── main.css           # Custom styles (CSS variables, responsive, animations)
│   ├── tailwind.src.css   # Tailwind build input (brand tokens)
│   └── tailwind.css       # Tailwind build output (committed, auto-generated)
├── images/                # PNG assets
├── services/              # Service pages (community-care, hospital-to-home, allied-health, complex-care)
├── careers/               # Career pages + expression-of-interest
├── resources/             # Blog, guides, FAQs, easy-read, forms
├── contact/               # Contact/inquiry forms
├── make-a-referral/       # Referral submission
├── legal/                 # Privacy policy, terms of use
├── Documentation/         # Security docs (README_SECURITY.md, etc.)
├── .htaccess              # Apache security headers, CSP, HSTS, caching
├── .github/workflows/     # deploy.yml — CI/CD pipeline
├── sitemap.xml            # SEO sitemap
└── robots.txt             # Crawler rules
```

## Building & Running Locally

```bash
# Install dependencies (first time only)
npm install

# Build Tailwind CSS (required after changing HTML classes or tailwind.src.css)
npm run build:css

# Watch mode — auto-rebuilds on file changes during development
npm run watch:css

# Serve locally (any static HTTP server works)
python -m http.server 8000
# Visit http://localhost:8000
```

## Deployment

Push to `main` branch triggers GitHub Actions → `npm ci` → `npm run build:css` → FTP deploy to SiteGround (`public_html/`). Uses secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`. Deploy config excludes `.git*`, `node_modules/`, `.env*`, `*.md`, `package*.json`, `tailwind.src.css`, `Documentation/`.

## Code Conventions

### JavaScript
- **IIFE pattern** for `forms.js` encapsulation
- **Frozen config object** exported from `config.js`
- **ES6 class** for `AuthService` in `auth.js`
- **Intersection Observer** for scroll animations
- **Direct DOM manipulation** — no jQuery or frameworks
- Form routing via `data-ccg-form` HTML attribute → maps to Power Automate endpoint

### CSS
- CSS custom properties for theming (brand colors: `--ccg-navy: #003B5C`, `--ccg-gold: #FFAB40`, `--ccg-teal: #0096A1`)
- Fluid typography with `clamp()`
- Glassmorphism effects on modals
- WCAG 2.2 AA accessibility baseline

### HTML
- Semantic markup with skip links
- Each page is a standalone `.html` file in its own directory (e.g., `services/community-care/index.html`)

## Form Submission Flow

```
User Input → Sanitization (textContent) → Validation → Rate Limit Check (5 req/min) → Fetch POST to Power Automate → Success/Error Modal
```

Five endpoints: SUPPORT, ENQUIRY, EOI, REFERRAL, FEEDBACK (configured in `js/config.js`). File attachments are Base64-encoded with validation (10MB max, 5 files max, restricted types).

## Security

- **CSP** enforced via `.htaccess` (allows GTM, Google Fonts, JotForm — no `unsafe-eval`)
- **HSTS** enabled
- **XSS prevention** — input sanitized via DOM `textContent`
- **Client-side rate limiting** on form submissions
- **File validation** — type, size, count checks
- **No secrets in code** — Power Automate SAS URLs are scoped, no database credentials
- Security documentation in `Documentation/` directory

## Key Architectural Decisions

1. **No backend** — static files + Power Automate for form processing (reduces attack surface)
2. **Minimal build tooling** — only `npm run build:css` (Tailwind CLI); no bundler/transpiler for JS
3. **Blog content in JS** — posts stored as objects in `blog.js` (no CMS/database)
4. **FTP deployment** — legacy hosting constraint; no rollback mechanism
5. **Custom error pages** — `4xx.html` and `5xx.html` for all HTTP errors

## Testing

No automated test suite. Manual testing via browser DevTools and Postman collection (`postman/CCG_Referral_API.postman_collection.json`).
