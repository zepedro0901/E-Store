import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/products";

export function SiteFooter() {
  const categories = getCategories();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 font-display text-base font-semibold tracking-wide"
          >
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-surface-2 ring-1 ring-accent/30">
              <Image
                src="/images/Pangolin 3.png"
                alt="Pangolin Resinworks"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </span>
            Pangolin Resinworks
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-foreground/60">
            Hand-finished resin miniatures, printed to order. Every figure is
            printed fresh &mdash; no warehouse of pre-made stock, just careful
            work on your piece.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-accent/80">
            Collections
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-foreground/65 transition-colors hover:text-accent"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-accent/80">
            Shop
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/products"
                className="text-foreground/65 transition-colors hover:text-accent"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/products?sort=newest"
                className="text-foreground/65 transition-colors hover:text-accent"
              >
                Newest Arrivals
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-6 text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Pangolin Resinworks</p>
          <p>Hand-finished resin miniatures, printed to order.</p>
        </div>
      </div>
    </footer>
  );
}
