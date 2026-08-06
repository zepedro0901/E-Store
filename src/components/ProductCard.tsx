import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getProductPriceRange } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const { min, max } = getProductPriceRange(product);
  const defaultVariation = product.variations?.[0];
  const unitPrice = defaultVariation?.price ?? product.price;
  const inStock = defaultVariation?.inStock ?? product.inStock;
  const image = defaultVariation?.image ?? product.images[0];

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/40">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-background"
      >
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
      </Link>
      <div className="flex flex-1 flex-col gap-1 border-t border-border p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          {product.scale}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-base font-semibold text-accent">
            {min === max
              ? formatPrice(min, product.currency)
              : `From ${formatPrice(min, product.currency)}`}
          </p>
          <AddToCartButton
            productId={product.id}
            slug={product.slug}
            name={product.name}
            price={unitPrice}
            image={image}
            inStock={inStock}
          />
        </div>
      </div>
    </div>
  );
}
