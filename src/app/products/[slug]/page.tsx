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
import { getDictionary } from "@/i18n/get-dictionary";
import {
  breadcrumbJsonLd,
  pageMetadata,
  productJsonLd,
  serializeJsonLd,
  truncate,
} from "@/lib/seo";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { locale, dict } = await getDictionary();
  const product = getProductBySlug(slug, locale);
  if (!product) return { title: dict.metadata.product };

  return pageMetadata({
    title: product.name,
    description: truncate(product.description),
    path: `/products/${slug}`,
    image: product.images[0],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { locale, dict } = await getDictionary();
  const product = getProductBySlug(slug, locale);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category, locale);
  const themes = product.themes
    .map((slug) => getThemeBySlug(slug, locale))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const breadcrumbItems = [
    { name: dict.common.allProducts, path: "/products" },
    ...(category
      ? [{ name: category.name, path: `/category/${category.slug}` }]
      : []),
    { name: product.name, path: `/products/${product.slug}` },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            productJsonLd(product, category?.name),
            breadcrumbJsonLd(breadcrumbItems),
          ]),
        }}
      />
      <nav className="mb-6 text-sm text-foreground/55">
        <Link href="/products" className="hover:text-accent">
          {dict.common.allProducts}
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
