import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { mutationClient } from "@/lib/apollo-client";
import { CREATE_ORDER } from "@/models/create-order";
import { PUBLISH_ORDER } from "@/models/publish-order";

export async function createOrder(
  total: number,
  stripeCheckoutId: string,
  orderStatus: OrderStatus
): Promise<Order> {
  const session = await auth();

  if (!session?.user) return redirect("/sign-in");

  const { data } = await mutationClient.mutate({
    mutation: CREATE_ORDER,
    variables: {
      email: session.user.email,
      total,
      stripeCheckoutId,
      orderStatus,
    },
  });

  await mutationClient.mutate({
    mutation: PUBLISH_ORDER,
    variables: {
      orderId: data.createOrder.id,
    },
  });

  return data.createOrder;
}
