import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { queryClient } from "@/lib/apollo-client";
import { GET_ORDER_BY_ID } from "@/models/get-order-by-id";

export async function getOrderById(id: string): Promise<OrderWithOrderItems> {
  const session = await auth();

  if (!session?.user) return redirect("/sign-in");

  const { data } = await queryClient.query({
    query: GET_ORDER_BY_ID,
    variables: { id, email: session.user.email },
  });

  return data.orders[0];
}
