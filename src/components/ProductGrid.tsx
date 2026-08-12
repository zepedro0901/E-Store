import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { getDictionary } from "@/i18n/get-dictionary";

export async function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    const { dict } = await getDictionary();
    return (
      <p className="py-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
        {dict.productGrid.noProductsMatch}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
