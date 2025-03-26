import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $email: String!
    $total: Int!
    $stripeCheckoutId: String!
    $orderStatus: PaymentType!
  ) {
    createOrder(
      data: {
        email: $email
        total: $total
        stripeCheckoutId: $stripeCheckoutId
        orderStatus: $orderStatus
      }
    ) {
      id
      email
      total
      stripeCheckoutId
      orderStatus
      createdAt
      updatedAt
    }
  }
`;
