import { queryClient } from "@/lib/apollo-client";
import { GET_PRODUCT_BY_SLUG } from "@/models/get-product-by-slug";

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data } = await queryClient.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug },
    fetchPolicy: "network-only",
  });

  return data.products[0];
}
