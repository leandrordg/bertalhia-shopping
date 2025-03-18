import { queryClient } from "@/lib/apollo-client";
import { GET_PRODUCTS, GetProducts } from "@/models/get-products";

export async function getProducts(): Promise<GetProducts[]> {
  const { data } = await queryClient.query({ query: GET_PRODUCTS });
  return data.products;
}
