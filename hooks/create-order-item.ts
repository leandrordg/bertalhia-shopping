import { mutationClient } from "@/lib/apollo-client";
import { CREATE_ORDER_ITEM } from "@/models/create-order-item";
import { PUBLISH_ORDER_ITEM } from "@/models/publish-order-item";

export async function createOrderItem(
  orderId: string,
  total: number,
  quantity: number,
  productVariant: string,
  productId: string
) {
  const { data } = await mutationClient.mutate({
    mutation: CREATE_ORDER_ITEM,
    variables: {
      orderId,
      total,
      quantity,
      productVariant,
      productId,
    },
  });

  await mutationClient.mutate({
    mutation: PUBLISH_ORDER_ITEM,
    variables: {
      orderItemId: data.createOrderItem.id,
    },
  });

  return data.createOrderItem;
}
