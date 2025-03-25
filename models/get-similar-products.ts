import { gql } from "@apollo/client";

export const GET_SIMILAR_PRODUCTS = gql`
  query GetSimilarProducts(
    $slug: String!
    $categoryIds: [ID!]!
    $collectionIds: [ID!]!
  ) {
    products(
      where: {
        AND: [
          {
            OR: [
              { categories_some: { id_in: $categoryIds } }
              { collections_some: { id_in: $collectionIds } }
            ]
          }
          { NOT: { slug: $slug } }
        ]
      }
      stage: PUBLISHED
      locales: pt_BR
    ) {
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
