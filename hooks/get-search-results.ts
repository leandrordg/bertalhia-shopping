import { queryClient } from "@/lib/apollo-client";
import { GET_SEARCH_RESULTS } from "@/models/get-search-results";

export async function getSearchResults(search?: string): Promise<SearchResult> {
  if (!search) return { products: [], categories: [], collections: [] };

  const { data } = await queryClient.query({
    query: GET_SEARCH_RESULTS,
    variables: { search },
  });

  return {
    products: data.products,
    categories: data.categories,
    collections: data.collections,
  };
}
