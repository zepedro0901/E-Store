# Pangolin Resinworks

> **This is a learning project, not a real business.** Pangolin Resinworks is a made-up store I created to practise two things: working with an AI coding assistant on a large codebase, and deploying a full website to production. No orders are fulfilled and no payments are taken.

**Live demo:** [pangolinresinworks.com](https://pangolinresinworks.com)

## Why I built this

I had two goals.

1. **Learn to work with [Claude Code](https://claude.com/claude-code) on a large project.** Using an AI assistant for a short script is easy. I wanted to find out what it takes to keep one productive over three weeks and 70+ commits on a codebase with a database, an API, two languages and a 1,600-product catalogue, and to keep the result coherent and secure.
2. **Learn how a website actually gets online.** Writing code that runs on my laptop is one thing. Hosting it, connecting a database, storing images, sending emails and pointing a domain at it are all skills I hadn't practised before.

An online shop was a good test case because it needs all of these at once: a large catalogue, search and filters, a cart, a checkout that must be protected against abuse, a database, email and SEO.

## What I learned

### Working with an AI assistant on a large codebase

- **Plan before coding.** For bigger features, such as the Portuguese/English translation and the "shop by theme" homepage, I had Claude Code write a design spec and an implementation plan first, and I reviewed both before any code was written. They're in [`docs/`](docs/). This caught misunderstandings early, when they were cheap to fix.
- **Give the assistant project rules.** [`AGENTS.md`](AGENTS.md) holds standing instructions the assistant reads every session. For example, this project uses a newer Next.js version than the AI was trained on, so the file tells it to check the current documentation before writing code.
- **Work in small steps.** I committed often, in small pieces, which made each change easier to check, and easier to undo when something went wrong.
- **Review; don't just accept.** A review of the checkout found that it trusted the prices sent by the browser, so anyone could edit a price before submitting an order. The fix makes the server look up every price itself. The lesson: AI-generated code needs the same scrutiny as anyone else's, especially where money or security is involved.
- **Test on real devices.** Several fixes, such as iPhone zooming into form fields and text overflowing on small screens, only showed up on an actual phone.

### Deploying and running a website

| Service | What it does here | What I learned |
|---|---|---|
| **Vercel** | Hosting, automatic deploys from GitHub, analytics | Managing environment variables and secrets, and working within free-tier limits. Image optimisation was switched off after it went over its quota. |
| **Neon** | Serverless PostgreSQL database for orders | Pooled vs direct connection strings, and creating tables with Drizzle Kit |
| **Cloudflare R2** | Storage for all product images | Moving images out of the Git repo into object storage, and serving them from a custom subdomain instead of R2's rate-limited development URL |
| **Resend** | Sends order emails | Sending email from a server, and making sure failures are reported instead of silently ignored |
| **Domain & DNS** | `pangolinresinworks.com` | Connecting a custom domain, and redirecting every variant of the address to one canonical URL |

One lesson stood out. The first version of the checkout's rate limiting (which stops spam orders) kept its counters in memory. On a serverless host like Vercel, each request can run on a fresh instance with its own empty memory, so the limit barely worked. Moving the counters into PostgreSQL fixed it, and it taught me how serverless hosting differs from a traditional server.

## What the site does

- A catalogue of **1,655 miniatures** in three collections, also grouped into eight themes
- Search, filters by collection, theme and price range, sorting, and pagination
- Product pages with image galleries, a size guide, and **variations** (alternative poses or sizes, each with its own price and image)
- A cart saved in the browser that survives page reloads
- A checkout that sends an **order request** by email rather than taking payment
- **Portuguese and English** throughout, including product descriptions
- SEO basics: social-sharing previews, Google product data, a sitemap and `robots.txt`
- Shipping, returns, privacy and terms pages

## How it's built

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL on Neon, accessed through Drizzle ORM |
| Forms & validation | React Hook Form, Zod |
| Client state | Zustand, saved to `localStorage` |
| Email | Resend |
| Images | Cloudflare R2 |
| Hosting | Vercel |

A few architecture decisions worth noting:

- **The catalogue is stored in JSON files, and orders in a database.** Product data rarely changes, so it ships with the site and pages load without database queries. PostgreSQL holds only what changes while the site is running: orders, order numbers and rate-limit counters.
- **The server recalculates every price.** The browser sends only product IDs and quantities.
- **Checkout is validated and rate-limited.** Order requests are checked with a strict Zod schema and limited to five per IP address every ten minutes.

```
src/
├── app/            Pages and routes, including the checkout API
├── components/     UI components
├── db/             Database schema and connection
├── i18n/           Portuguese and English translations
└── lib/            Catalogue queries, cart, shipping, orders, email, SEO
data/               Catalogue data (products, collections, themes)
scripts/            One-off catalogue clean-up and image-migration tools
docs/               Design specs and implementation plans
```

## Run it locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You can browse the whole catalogue without any configuration.

Checkout also needs a database and an email service. To enable it, create a `.env.local` file:

```bash
DATABASE_URL=postgres://...              # Neon pooled connection
DATABASE_URL_UNPOOLED=postgres://...     # Neon direct connection (for Drizzle Kit)
RESEND_API_KEY=re_...
ORDER_NOTIFICATION_EMAIL=you@example.com # Where order requests are sent
ORDER_FROM_EMAIL=orders@yourdomain.com   # Sender address verified in Resend
```

Then create the database tables:

```bash
npx dotenv -e .env.local -- npx drizzle-kit push
```

## Next steps

- **Write the automated test suite myself**, starting with pricing, shipping and checkout, as a way to learn the codebase in depth
- Put a clear "demo project" notice on the live site itself

## Credits

The miniature designs, names and images in the catalogue belong to their original creators and are used here for demonstration only.
