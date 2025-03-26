import { gql } from "@apollo/client";

export const UPDATE_PRODUCT_SIZE_COLOR_VARIANT = gql`
  mutation UpdateProductSizeColorVariant($variantId: ID!, $quantity: Int!) {
    updateProductSizeColorVariant(
      where: { id: $variantId }
      data: { quantity: $quantity }
    ) {
      id
      quantity
    }
  }
`;
