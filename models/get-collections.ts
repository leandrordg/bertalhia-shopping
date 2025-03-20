import { gql } from "@apollo/client";

export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(stage: PUBLISHED, locales: pt_BR) {
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
