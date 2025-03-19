import { gql } from "@apollo/client";

export const GET_COLLECTIONS_BY_SLUG_WITH_PRODUCTS = gql`
  query GetCollectionsBySlugWithProducts($slug: String!) {
    collections(where: { slug: $slug }, stage: PUBLISHED, locales: pt_BR) {
      id
      name
      slug
      description
      createdAt
      updatedAt
      images {
        id
        fileName
        createdAt
        updatedAt
        url
      }
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
        }
      }
    }
  }
`;
