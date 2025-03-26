import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { queryClient } from "@/lib/apollo-client";
import { GET_ORDERS_BY_STRIPE_CHECKOUT_ID } from "@/models/get-order-by-stripe-checkout-id";

export async function getOrdersByStripeCheckoutId(
  stripeCheckoutId: string
): Promise<OrderWithOrderItems> {
  const session = await auth();

  if (!session?.user) return redirect("/sign-in");

  const { data } = await queryClient.query({
    query: GET_ORDERS_BY_STRIPE_CHECKOUT_ID,
    variables: { email: session.user.email, stripeCheckoutId },
    fetchPolicy: "network-only",
  });

  return data.orders[0];
}
