import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.checkout.title };
}

export default async function CheckoutPage() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        {dict.checkout.title}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-foreground/60">
        {dict.checkout.subtitle}
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
