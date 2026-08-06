import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Request an Order",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-wide">
        Request an Order
      </h1>
      <p className="mt-2 max-w-xl text-sm text-foreground/60">
        Fill in your details below and we&apos;ll email you back to arrange
        payment and shipping for the miniatures in your cart.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
