import Image from "next/image";
import Link from "next/link";
import { CartIcon } from "@/components/CartIcon";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/i18n/get-dictionary";

export async function SiteHeader() {
  const { dict } = await getDictionary();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-lg font-semibold tracking-wide"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 ring-1 ring-accent/30">
            <Image
              src="/images/Pangolin 3.png"
              alt="Pangolin Resinworks"
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden sm:inline">Pangolin Resinworks</span>
        </Link>

        <nav className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide sm:gap-6 sm:text-sm">
          <Link
            href="/products"
            className="text-foreground/70 transition-colors hover:text-accent"
          >
            {dict.common.allProducts}
          </Link>
          <LanguageSwitcher />
          <CartIcon />
        </nav>

        <form action="/products" className="order-3 w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-xs">
          <div className="relative">
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
            >
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M18 18L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              name="q"
              placeholder={dict.header.searchPlaceholder}
              className="w-full rounded-full border border-border bg-surface py-1.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent/50 sm:py-2"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
