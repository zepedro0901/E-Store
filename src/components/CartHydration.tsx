"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";

// Cart state is persisted to localStorage, which doesn't exist during SSR --
// skipHydration on the store defers reading it until this fires on mount,
// avoiding a hydration mismatch between server and client markup.
export function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return null;
}
