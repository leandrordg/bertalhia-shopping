import { mutationClient } from "@/lib/apollo-client";
import { PUBLISH_PRODUCT_SIZE_COLOR_VARIANT } from "@/models/publish-produt-size-color-variant";
import { UPDATE_PRODUCT_SIZE_COLOR_VARIANT } from "@/models/update-product-size-color-variant";

export async function updateProductSizeColorVariant(
  variantId: string,
  totalQuantity: number,
  selectedQuantity: number
): Promise<{ id: string; quantity: number }> {
  const newQuantity = totalQuantity - selectedQuantity;

  const { data } = await mutationClient.mutate({
    mutation: UPDATE_PRODUCT_SIZE_COLOR_VARIANT,
    variables: {
      variantId,
      quantity: newQuantity,
    },
  });

  await mutationClient.mutate({
    mutation: PUBLISH_PRODUCT_SIZE_COLOR_VARIANT,
    variables: {
      variantId,
    },
  });

  return data.updateProductSizeColorVariant;
}
