import { gql } from "@apollo/client";

export const GET_ORDERS_BY_USER = gql`
  query GetOrdersByUser($email: String!) {
    orders(where: { email: $email }) {
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
