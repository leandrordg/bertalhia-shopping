import { gql } from "@apollo/client";

export const GET_ORDERS_BY_STRIPE_CHECKOUT_ID = gql`
  query GetOrdersByStripeCheckoutId(
    $email: String!
    $stripeCheckoutId: String!
  ) {
    orders(where: { email: $email, stripeCheckoutId: $stripeCheckoutId }) {
      id
      email
      total
      stripeCheckoutId
      orderStatus
      createdAt
      updatedAt
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
