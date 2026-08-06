import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import {
  getAllProducts,
  getCategoryBySlug,
  getProductBySlug,
  getThemeBySlug,
} from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? product.name : "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const themes = product.themes
    .map((slug) => getThemeBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <nav className="mb-6 text-sm text-foreground/55">
        <Link href="/products" className="hover:text-accent">
          All Products
        </Link>
        {category && (
          <>
            {" / "}
            <Link
              href={`/category/${category.slug}`}
              className="hover:text-accent"
            >
              {category.name}
            </Link>
          </>
        )}
      </nav>
      <ProductDetail product={product} themes={themes} />
    </div>
  );
}
