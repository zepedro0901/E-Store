# Pangolin Resinworks

**Live at [pangolinresinworks.com](https://pangolinresinworks.com)**


Built with Next.js, TypeScript and PostgreSQL.

## Features

**Browsing**
- A catalogue of **1,655 miniatures** in three collections, also grouped into eight themes such as dragons, undead and terrain
- Search, filters by collection, theme and price range, four ways to sort, and 48 products per page
- Product pages with image galleries and a size guide
- **Variations** such as alternative poses or sizes, each of which can have its own price, image and stock status

**Ordering**
- A cart that survives page reloads, saved in the browser
- **Order requests instead of card payments.** Because every miniature is made to order, checkout sends a request rather than taking payment. The order is saved and emailed to the shop, which replies to the customer to confirm and arrange payment.
- Readable order numbers (e.g. `#2026-000042`) that restart every year
- Shipping calculated for Portugal and the rest of the EU, with free-shipping thresholds

**Everything else**
- **Portuguese and English** throughout, including product names and descriptions (Portuguese by default, with a language switcher)
- Search-engine metadata: social-sharing previews, Google product data, a sitemap and `robots.txt`
- Shipping, returns, privacy and terms pages, plus FAQ and contact pages
- Privacy-friendly, cookieless analytics

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL (Neon), accessed through Drizzle ORM |
| Forms & validation | React Hook Form, Zod |
| Client state | Zustand, saved to `localStorage` |
| Email | Resend |
| Images | Cloudflare R2 |
| Hosting & analytics | Vercel |

## Under the hood

**Catalogue as data files, orders in a database.** Products, collections and themes live in JSON files in `data/`, so product pages load fast and need no database queries. PostgreSQL stores only what changes at runtime: orders, order numbers and rate-limit counters.

**The server never trusts the browser's prices.** At checkout, the API receives only product IDs, variations and quantities. It looks up each item's real price on the server before saving the order, so editing prices in the browser has no effect.

**Checkout is protected at several levels:**
- Every order request is validated with a strict Zod schema, including limits on field lengths, quantities and cart size.
- Checkout is **rate-limited** to five orders per IP address every ten minutes. The limit is stored in PostgreSQL, so it works across serverless instances.
- Customer input is escaped before being inserted into the order email.
- No card details ever touch the site, because payment is arranged separately once an order is accepted.

**Order numbers are generated safely.** Each year has a counter row that's incremented with a single `INSERT ... ON CONFLICT DO UPDATE` statement, so two orders placed at the same time can never get the same number.

**Translations fall back field by field.** Catalogue data is written in English, with optional Portuguese overrides for each field. If a translation is missing, English shows instead of a blank space.

## Project structure

```
src/
├── app/                  Pages and routes (Next.js App Router)
│   ├── api/checkout/     Order endpoint: validation, re-pricing, rate limiting
│   ├── products/         Catalogue and product pages
│   ├── category/, theme/ Collection and theme listings
│   └── cart/, checkout/  Cart and checkout flow
├── components/           UI components (gallery, filters, cart, forms, ...)
├── db/                   Drizzle schema and database connection
├── i18n/                 Language dictionaries, locale cookie, translation hooks
└── lib/                  Catalogue queries, cart store, shipping, orders, email, SEO
data/                     Catalogue: products, collections, themes
scripts/                  One-off catalogue and image-migration tools
pricing/                  PrusaSlicer profiles used to estimate print costs
docs/                     Design specs and implementation plans
```

## Getting started

### Requirements

- Node.js 20 or later

### Install and run

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). You can browse the whole catalogue without any configuration; only checkout needs a database and email service.

### Enabling checkout

Create a `.env.local` file:

```bash
DATABASE_URL=postgres://...            # Pooled PostgreSQL connection (used by the app)
DATABASE_URL_UNPOOLED=postgres://...   # Direct connection (used by Drizzle Kit)
RESEND_API_KEY=re_...                  # Resend API key
ORDER_NOTIFICATION_EMAIL=you@example.com  # Where new order requests are sent
ORDER_FROM_EMAIL=orders@yourdomain.com    # Sender address (a domain verified in Resend)
```

Then create the database tables:

```bash
npx dotenv -e .env.local -- npx drizzle-kit push
```

## Catalogue tooling

The catalogue was assembled and cleaned with a few Node scripts in `scripts/`:

- **`build-themes.js`** sorts all 1,600+ products into themes by matching keywords in their names, descriptions and tags.
- **`normalize-scale.js`** converts raw measurements like "32 mm" or "75mm" into standard tabletop base sizes (Small, Medium, Large, Huge, ...).
- **R2 migration scripts** moved product images from the repository to Cloudflare R2 and pointed the catalogue at a custom image domain.

The `pricing/` folder holds hand-built PrusaSlicer profiles for the Anycubic Photon M5s printer. Slicing each model with them estimates its resin use and print time, which feed into pricing.

## How it was built

I built the whole project in about three weeks, over 70+ commits, using AI-assisted development with [Claude Code](https://claude.com/claude-code). For larger features, such as the Portuguese/English translation and the homepage "shop by theme" section, I wrote a design spec and an implementation plan before any code; they're in `docs/`.

## Roadmap

- Optional online payment once an order has been accepted
- Automated tests for checkout, pricing and shipping rules
- An admin view for managing orders
- Moving the catalogue from JSON files into the database, so products can be edited without redeploying
