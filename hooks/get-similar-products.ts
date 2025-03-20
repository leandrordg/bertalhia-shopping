import { queryClient } from "@/lib/apollo-client";
import { GET_SIMILAR_PRODUCTS } from "@/models/get-similar-products";

export async function getSimilarProducts(
  product: Product
): Promise<SimilarProducts> {
  const categoryIds = product.categories.map((category) => category.id);
  const collectionIds = product.collections.map((collection) => collection.id);

  const { data } = await queryClient.query({
    query: GET_SIMILAR_PRODUCTS,
    variables: { slug: product.slug, categoryIds, collectionIds },
  });

  const productsByCategory = data.products.filter((p: Product) =>
    p.categories?.some((category) => categoryIds.includes(category.id))
  );

  const productsByCollection = data.products.filter((p: Product) =>
    p.collections?.some((collection) => collectionIds.includes(collection.id))
  );

  return {
    productsByCategory,
    productsByCollection,
  };
}
