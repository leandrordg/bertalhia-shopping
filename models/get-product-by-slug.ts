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
