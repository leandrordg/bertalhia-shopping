type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  images: {
    id: string;
    url: string;
    fileName: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  price: number;
  updatedAt: string;
  variants: {
    id: string;
    name: string;
    size: string;
    color: string;
    createdAt: string;
    updatedAt: string;
  }[];
  collections: {
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
