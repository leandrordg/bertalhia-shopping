import { gql } from "@apollo/client";

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($search: String!) {
    products(
      where: { name_contains: $search }
      stage: PUBLISHED
      locales: pt_BR
    ) {
      id
      name
      description
      slug
      price
      createdAt
      updatedAt
      images {
        id
        fileName
        url
        createdAt
        updatedAt
      }
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

    collections(where: { name_contains: $search }) {
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

    categories(where: { name_contains: $search }) {
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
`;
