import { gql } from "@apollo/client";

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($search: String!) {
    products(where: { name_contains: $search }) {
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
      categories {
        id
        name
        slug
        description
        createdAt
        updatedAt
      }
    }

    collections(where: { name_contains: $search }) {
      id
      name
      slug
      description
      createdAt
      updatedAt
    }

    categories(where: { name_contains: $search }) {
      id
      name
      slug
      description
      createdAt
      updatedAt
    }
  }
`;
