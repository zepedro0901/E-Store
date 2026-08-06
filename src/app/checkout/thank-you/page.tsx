import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Request Sent",
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        Order Request Sent
      </h1>
      <p className="max-w-md text-foreground/65">
        Thanks! We&apos;ve received your order request and will email you
        shortly to confirm payment and shipping details.
      </p>
      <Link
        href="/products"
        className="mt-4 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
      >
        Continue Browsing
      </Link>
    </div>
  );
}
