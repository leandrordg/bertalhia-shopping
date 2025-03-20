type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  bannerImage: Image;
};

type CollectionWithProducts = Collection & {
  products: Product[];
};
