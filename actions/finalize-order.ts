import { updateOrderStatus } from "@/hooks/update-order-status";
import { updateProductSizeColorVariant } from "@/hooks/update-product-variant-quantity";

export async function finalizeOrder(
  orderId: string,
  variantId: string,
  totalQuantity: number,
  selectedQuantity: number
) {
  const order = await updateOrderStatus(orderId, "succeeded");

  const variant = await updateProductSizeColorVariant(
    variantId,
    totalQuantity,
    selectedQuantity
  );

  return { order, variant };
}
