import { gql } from "@apollo/client";

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem(
    $orderId: ID!
    $total: Int!
    $quantity: Int!
    $productVariant: String!
    $productId: ID!
  ) {
    createOrderItem(
      data: {
        total: $total
        quantity: $quantity
        productVariant: $productVariant
        product: { connect: { id: $productId } }
        order: { connect: { id: $orderId } }
      }
    ) {
      id
      total
      quantity
      createdAt
      updatedAt
      productVariant
    }
  }
`;
