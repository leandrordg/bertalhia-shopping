import { mutationClient } from "@/lib/apollo-client";
import { PUBLISH_ORDER } from "@/models/publish-order";
import { UPDATE_ORDER_STATUS } from "@/models/update-order-status";

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<{ id: string; status: string }> {
  const { data } = await mutationClient.mutate({
    mutation: UPDATE_ORDER_STATUS,
    variables: {
      orderId,
      status,
    },
  });

  await mutationClient.mutate({
    mutation: PUBLISH_ORDER,
    variables: {
      orderId,
    },
  });

  return data.updateOrder;
}
