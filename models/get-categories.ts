import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(stage: PUBLISHED, locales: pt_BR) {
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
