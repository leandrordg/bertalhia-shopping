type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  images: {
    id: string;
    url: string;
    fileName: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

type CategoryWithProducts = Category & {
  products: Product[];
};
