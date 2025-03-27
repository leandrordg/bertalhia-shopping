import { queryClient } from "@/lib/apollo-client";
import { GET_SEARCH_RESULTS } from "@/models/get-search-results";

export async function getSearchResults(search?: string): Promise<Product[]> {
  if (!search) return [];

  const { data } = await queryClient.query({
    query: GET_SEARCH_RESULTS,
    variables: { search },
    fetchPolicy: "network-only",
  });

  return data.products;
}
