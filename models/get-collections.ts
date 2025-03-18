import { gql } from "@apollo/client";

export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      name
      slug
      description
      createdAt
      updatedAt
    }
  }
`;
