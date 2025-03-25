type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  price: number;
  updatedAt: string;
  images: Image[];
  variants: Variant[];
  collections: Collection[];
  categories: Category[];
  reviews: Review[];
};

type SimilarProducts = {
  productsByCategory: Product[];
  productsByCollection: Product[];
};

type ProductWithCart = Product & {
  quantity: number;
  variantId: string;
};
