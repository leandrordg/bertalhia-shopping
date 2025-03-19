type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
};

type CategoryWithProducts = Category & {
  products: Product[];
};
