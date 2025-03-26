import { gql } from "@apollo/client";

export const PUBLISH_ORDER_ITEM = gql`
  mutation PublishOrderItem($orderItemId: ID!) {
    publishOrderItem(where: { id: $orderItemId }) {
      id
    }
  }
`;
