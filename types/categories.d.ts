type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type CategoryWithProducts = Category & {
  products: Product[];
};
