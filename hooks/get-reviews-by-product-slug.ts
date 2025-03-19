import { queryClient } from "@/lib/apollo-client";
import { GET_REVIEWS_BY_PRODUCT_SLUG } from "@/models/get-reviews-by-product-slug";

export async function getReviewsByProductSlug(
  productSlug: string
): Promise<Review[]> {
  const { data } = await queryClient.query({
    query: GET_REVIEWS_BY_PRODUCT_SLUG,
    variables: { productSlug },
  });

  return data.reviews;
}
