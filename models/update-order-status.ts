import { gql } from "@apollo/client";

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: PaymentType!) {
    updateOrder(where: { id: $orderId }, data: { orderStatus: $status }) {
      id
      orderStatus
    }
  }
`;
