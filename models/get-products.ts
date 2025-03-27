import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(stage: PUBLISHED, locales: pt_BR, orderBy: createdAt_DESC) {
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
          quantity
          createdAt
          updatedAt
        }
        ... on ProductColorVariant {
          id
          name
          color
          quantity
          createdAt
          updatedAt
        }
        ... on ProductSizeVariant {
          id
          name
          size
          quantity
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
