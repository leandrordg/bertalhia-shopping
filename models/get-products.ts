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
