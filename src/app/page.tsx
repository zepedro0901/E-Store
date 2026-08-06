import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { ScaleDivider } from "@/components/ScaleDivider";
import { getAllProducts, getCategories, getFeaturedProducts } from "@/lib/products";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Print",
    description: "Your chosen miniature is sliced and printed fresh, layer by layer, on our resin printer.",
  },
  {
    num: "02",
    title: "Wash",
    description: "Straight off the plate, the piece is washed clean of every trace of uncured resin.",
  },
  {
    num: "03",
    title: "Cure",
    description: "It sets under UV light until fully hardened, locking in every sculpted detail.",
  },
  {
    num: "04",
    title: "Finish",
    description: "Supports are trimmed, the piece is inspected by hand, then packed to ship.",
  },
];

export default function Home() {
  const categories = getCategories();
  const allProducts = getAllProducts();
  const featured = getFeaturedProducts(8);

  const stats = [
    {
      value: `${allProducts.length.toLocaleString()}+`,
      label: "Miniatures in the catalog",
    },
    { value: `${categories.length}`, label: "Curated collections" },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-346443e037884128baef7c2a9dc3e366.r2.dev/collection-4/pentelia-mother-of-all-dragons/1.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div
            aria-hidden
            className="scale-field absolute inset-0 opacity-[0.05] text-foreground"
          />
          <div
            aria-hidden
            className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent-glass blur-3xl"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-24 sm:pb-20 sm:pt-32">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            001 &mdash; Resin Miniatures
          </span>
          <h1 className="max-w-3xl font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight sm:text-8xl">
            Printed to
            <br />
            order
          </h1>
          <p className="max-w-xl text-lg text-foreground/70">
            Printed, cured, and finished by hand &mdash; one miniature at a
            time. A growing catalog of dark fantasy characters, monsters,
            and dragons.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products"
              className="bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Browse All Products
            </Link>
            <Link
              href="#categories"
              className="border border-border px-7 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
            >
              Explore Collections
            </Link>
          </div>
        </div>

        <div className="relative">
          <ScaleDivider color="var(--surface)" />
          <dl className="flex w-full flex-wrap justify-center gap-x-16 gap-y-6 bg-surface px-6 py-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold text-accent">
                  {stat.value}
                </dd>
                <dd className="mt-1 font-mono text-xs uppercase tracking-wide text-foreground/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <section id="categories" className="mb-20 scroll-mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
              Shop by Category
            </h2>
            <span className="hidden h-px flex-1 bg-border sm:ml-8 sm:block" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative aspect-square overflow-hidden border border-border"
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                <div className="absolute inset-0 border border-accent/0 transition-colors duration-300 group-hover:border-accent/40" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-sm font-semibold uppercase tracking-wide text-white">
                  {category.name}
                  <span className="translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {featured.length > 0 && (
          <section className="mb-20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
                  Featured
                </h2>
                <p className="mt-1 text-sm text-foreground/55">
                  A hand-picked look at what our resin can do.
                </p>
              </div>
              <Link
                href="/products"
                className="font-mono text-xs uppercase tracking-wide text-accent hover:text-accent-hover"
              >
                View all products &rarr;
              </Link>
            </div>
            <ProductGrid products={featured} />
          </section>
        )}

        <section className="mb-20 border border-border bg-surface px-6 py-14 sm:px-10">
          <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
              From File to Finish
            </h2>
            <p className="font-mono text-xs uppercase tracking-wide text-foreground/50">
              No pre-printed stock &mdash; every order starts at Step 01
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-4">
            {PROCESS_STEPS.map((item, i) => (
              <div key={item.title} className="relative pt-6">
                <div className="absolute left-0 right-0 top-0 h-px bg-border">
                  <div className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-accent" />
                </div>
                <span className="font-mono text-xs text-accent">
                  {item.num}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  {item.description}
                </p>
                {i < PROCESS_STEPS.length - 1 && (
                  <span className="pointer-events-none absolute right-0 top-2.5 hidden -translate-y-1/2 translate-x-1/2 text-border sm:block">
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="relative flex flex-col items-center gap-4 overflow-hidden bg-accent px-6 py-16 text-center text-accent-foreground">
          <div
            aria-hidden
            className="scale-field absolute inset-0 opacity-10 text-accent-foreground"
          />
          <h2 className="relative font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            Ready to find your next miniature?
          </h2>
          <p className="relative max-w-md text-sm opacity-90">
            {allProducts.length.toLocaleString()} miniatures across{" "}
            {categories.length} collections, waiting to be printed.
          </p>
          <Link
            href="/products"
            className="relative mt-2 bg-accent-foreground px-7 py-3 text-sm font-semibold uppercase tracking-wide text-accent transition-transform hover:scale-105"
          >
            Browse All Products
          </Link>
        </section>
      </div>
    </div>
  );
}
