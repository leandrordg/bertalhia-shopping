import { queryClient } from "@/lib/apollo-client";
import { GET_CATEGORIES_BY_SLUG_WITH_PRODUCTS } from "@/models/get-categories-by-slug-with-products";

export async function getCategoryBySlugWithProducts(
  slug: string
): Promise<CategoryWithProducts> {
  const { data } = await queryClient.query({
    query: GET_CATEGORIES_BY_SLUG_WITH_PRODUCTS,
    variables: { slug },
  });

  return data.categories[0];
}
