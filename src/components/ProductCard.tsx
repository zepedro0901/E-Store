import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getProductPriceRange } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";
import { formatScale } from "@/lib/format";

export async function ProductCard({ product }: { product: Product }) {
  const { min, max } = getProductPriceRange(product);
  const { locale, dict } = await getDictionary();

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-surface transition-colors hover:border-accent/40">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden rounded-t-lg bg-background"
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
            {dict.common.outOfStock}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 rounded-b-lg border-t border-border p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        {product.scale && (
          <p className="text-xs uppercase tracking-wide text-foreground/50">
            {formatScale(product.scale, dict.sizeCategories)}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="text-base font-semibold text-accent">
            {min === max
              ? formatPrice(min, product.currency, locale)
              : interpolate(dict.productCard.fromPrice, {
                  price: formatPrice(min, product.currency, locale),
                })}
          </p>
          <AddToCartButton
            productId={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            inStock={product.inStock}
            currency={product.currency}
            variations={product.variations}
          />
        </div>
      </div>
    </div>
  );
}
