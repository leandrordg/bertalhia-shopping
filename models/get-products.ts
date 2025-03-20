import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(stage: PUBLISHED, locales: pt_BR) {
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
        ... on ProductColorVariant {
          id
          name
          color
          createdAt
          updatedAt
        }
        ... on ProductSizeVariant {
          id
          name
          size
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
        bannerImage {
          id
          fileName
          createdAt
          updatedAt
          url
        }
      }
      categories {
        id
        name
        slug
        description
        createdAt
        updatedAt
        bannerImage {
          id
          fileName
          createdAt
          updatedAt
          url
        }
      }
    }
  }
`;
