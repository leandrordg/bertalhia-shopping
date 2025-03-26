import { gql } from "@apollo/client";

export const PUBLISH_ORDER = gql`
  mutation PublishOrder($orderId: ID!) {
    publishOrder(where: { id: $orderId }) {
      id
    }
  }
`;
