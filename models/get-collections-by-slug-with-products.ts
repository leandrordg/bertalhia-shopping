import { gql } from "@apollo/client";

export const GET_COLLECTIONS_BY_SLUG_WITH_PRODUCTS = gql`
  query GetCollectionsBySlugWithProducts($slug: String!) {
    collections(where: { slug: $slug }) {
      id
      name
      slug
      description
      createdAt
      updatedAt
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
  }
`;
