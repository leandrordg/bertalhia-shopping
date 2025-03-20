type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  bannerImage: Image;
};

type CategoryWithProducts = Category & {
  products: Product[];
};
