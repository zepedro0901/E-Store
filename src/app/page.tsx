import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { ScaleDivider } from "@/components/ScaleDivider";
import { getAllProducts, getCategories, getFeaturedProducts } from "@/lib/products";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";

export default async function Home() {
  const { locale, dict } = await getDictionary();
  const categories = getCategories(locale);
  const allProducts = getAllProducts(locale);
  const featured = getFeaturedProducts(8, locale);

  const stats = [
    {
      value: `${allProducts.length.toLocaleString()}+`,
      label: dict.home.statMiniatures,
    },
    { value: `${categories.length}`, label: dict.home.statCollections },
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
            {dict.home.heroKicker}
          </span>
          <h1 className="max-w-3xl font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight sm:text-8xl">
            {dict.home.heroTitleLine1}
            <br />
            {dict.home.heroTitleLine2}
          </h1>
          <p className="max-w-xl text-lg text-foreground/70">
            {dict.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products"
              className="bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              {dict.common.browseAllProducts}
            </Link>
            <Link
              href="#categories"
              className="border border-border px-7 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
            >
              {dict.home.exploreCollections}
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
              {dict.home.shopByCategory}
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
                  {dict.home.featured}
                </h2>
                <p className="mt-1 text-sm text-foreground/55">
                  {dict.home.featuredSubtitle}
                </p>
              </div>
              <Link
                href="/products"
                className="font-mono text-xs uppercase tracking-wide text-accent hover:text-accent-hover"
              >
                {dict.home.viewAllProducts} &rarr;
              </Link>
            </div>
            <ProductGrid products={featured} />
          </section>
        )}

        <section className="mb-20 border border-border bg-surface px-6 py-14 sm:px-10">
          <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
              {dict.home.processTitle}
            </h2>
            <p className="font-mono text-xs uppercase tracking-wide text-foreground/50">
              {dict.home.processSubtitle}
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-4">
            {dict.home.processSteps.map((item, i) => (
              <div key={item.title} className="relative pt-6">
                <div className="absolute left-0 right-0 top-0 h-px bg-border">
                  <div className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-accent" />
                </div>
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  {item.description}
                </p>
                {i < dict.home.processSteps.length - 1 && (
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
            {dict.home.ctaTitle}
          </h2>
          <p className="relative max-w-md text-sm opacity-90">
            {interpolate(dict.home.ctaSubtitle, {
              count: allProducts.length.toLocaleString(),
              collections: categories.length,
            })}
          </p>
          <Link
            href="/products"
            className="relative mt-2 bg-accent-foreground px-7 py-3 text-sm font-semibold uppercase tracking-wide text-accent transition-transform hover:scale-105"
          >
            {dict.common.browseAllProducts}
          </Link>
        </section>
      </div>
    </div>
  );
}
