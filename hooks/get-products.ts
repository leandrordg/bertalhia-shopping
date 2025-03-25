import { queryClient } from "@/lib/apollo-client";
import { GET_PRODUCTS } from "@/models/get-products";

export async function getProducts(): Promise<Product[]> {
  const { data } = await queryClient.query({
    query: GET_PRODUCTS,
    fetchPolicy: "network-only",
  });

  return data.products;
}
