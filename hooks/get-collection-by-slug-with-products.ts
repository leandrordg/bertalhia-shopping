import { queryClient } from "@/lib/apollo-client";
import { GET_COLLECTIONS_BY_SLUG_WITH_PRODUCTS } from "@/models/get-collections-by-slug-with-products";

export async function getCollectionBySlugWithProducts(
  slug: string
): Promise<CollectionWithProducts> {
  const { data } = await queryClient.query({
    query: GET_COLLECTIONS_BY_SLUG_WITH_PRODUCTS,
    variables: { slug },
  });

  return data.collections[0];
}
