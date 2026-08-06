import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        Your Cart
      </h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
