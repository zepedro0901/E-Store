import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getProductPriceRange } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { min, max } = getProductPriceRange(product);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/40"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-background">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-black/75 px-2.5 py-1 text-xs font-medium text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-border p-4">
        <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          {product.scale}
        </p>
        <p className="mt-2 text-base font-semibold text-accent">
          {min === max
            ? formatPrice(min, product.currency)
            : `From ${formatPrice(min, product.currency)}`}
        </p>
      </div>
    </Link>
  );
}
