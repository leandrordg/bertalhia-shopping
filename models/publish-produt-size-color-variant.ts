import { gql } from "@apollo/client";

export const PUBLISH_PRODUCT_SIZE_COLOR_VARIANT = gql`
  mutation PublishProductSizeColorVariant($variantId: ID!) {
    publishProductSizeColorVariant(where: { id: $variantId }) {
      id
      quantity
    }
  }
`;
