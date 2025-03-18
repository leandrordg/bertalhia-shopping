import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    products(where: { slug: $slug }) {
      id
      name
      description
      slug
      images {
        id
        fileName
        createdAt
        updatedAt
        url
      }
      createdAt
      price
      updatedAt
      variants {
        ... on ProductSizeColorVariant {
          id
          name
          size
          color
          createdAt
          updatedAt
        }
      }
      collections {
        id
        name
        slug
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export type GetProductBySlug = {
  id: string;
  name: string;
  description: string;
  slug: string;
  images: {
    id: string;
    fileName: string;
    createdAt: string;
    updatedAt: string;
    url: string;
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
