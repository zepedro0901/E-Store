export interface ProductVariation {
  id: string;
  label: string;
  price?: number; // cents; overrides the product's base price when set
  inStock?: boolean; // overrides the product's base inStock when set
  image?: string; // when set, selecting this variation shows this image in the gallery
}

export interface ProductTranslations {
  pt?: {
    name?: string;
    description?: string;
    tags?: string[];
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  themes: string[];
  tags: string[];
  price: number; // cents
  currency: "EUR" | "USD";
  description: string;
  scale: string;
  material: "resin";
  images: string[];
  inStock: boolean;
  featured?: boolean;
  hidden?: boolean; // excluded from all storefront listings/lookups when true
  createdAt: string; // ISO date
  variations?: ProductVariation[];
  translations?: ProductTranslations;
}

export interface NameTranslations {
  pt?: {
    name?: string;
    description?: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
  image?: string;
  translations?: NameTranslations;
}

export interface Theme {
  slug: string;
  name: string;
  description?: string;
  image?: string;
  translations?: NameTranslations;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variationId?: string;
  variationLabel?: string;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";
