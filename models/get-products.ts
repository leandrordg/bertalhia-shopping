import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      slug
      images {
        id
        url
        createdAt
        updatedAt
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
    }
  }
`;

export type GetProducts = {
  id: string;
  name: string;
  description: string;
  slug: string;
  images: {
    id: string;
    url: string;
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
};
