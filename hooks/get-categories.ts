import { queryClient } from "@/lib/apollo-client";
import { GET_CATEGORIES } from "@/models/get-categories";

export async function getCategories(): Promise<Category[]> {
  const { data } = await queryClient.query({ query: GET_CATEGORIES });
  return data.categories;
}
