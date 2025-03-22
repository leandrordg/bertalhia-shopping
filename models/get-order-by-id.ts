import { gql } from "@apollo/client";

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!, $email: String!) {
    orders(where: { id: $id, email: $email }) {
      id
      email
      total
      createdAt
      updatedAt
      stripeCheckoutId
      orderItems {
        id
        total
        quantity
        createdAt
        updatedAt
        productVariant
        product {
          id
          name
          description
          slug
          createdAt
          price
          updatedAt
          images {
            id
            fileName
            createdAt
            updatedAt
            url
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
    }
  }
`;
