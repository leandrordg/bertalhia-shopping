import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { queryClient } from "@/lib/apollo-client";
import { GET_ORDERS_BY_USER } from "@/models/get-orders-by-user";

export async function getOrdersByUser(): Promise<OrderWithOrderItems[]> {
  const session = await auth();

  if (!session?.user) return redirect("/sign-in");

  const { data } = await queryClient.query({
    query: GET_ORDERS_BY_USER,
    variables: { email: session.user.email },
  });

  return data.orders;
}
