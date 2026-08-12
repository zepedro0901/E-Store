import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.thankYou.title };
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        {dict.thankYou.title}
      </h1>
      {order && (
        <p className="font-mono text-sm text-foreground/50">
          {interpolate(dict.thankYou.orderLabel, { order })}
        </p>
      )}
      <p className="max-w-md text-foreground/65">{dict.thankYou.message}</p>
      <Link
        href="/products"
        className="mt-4 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        {dict.thankYou.continueBrowsing}
      </Link>
    </div>
  );
}
