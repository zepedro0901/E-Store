import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.cart.title };
}

export default async function CartPage() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        {dict.cart.title}
      </h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
