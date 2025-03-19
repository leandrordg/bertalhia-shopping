import { gql } from "@apollo/client";

export const GET_REVIEWS_BY_PRODUCT_SLUG = gql`
  query GetReviewsByProductSlug($productSlug: String!) {
    reviews(
      where: { product: { slug: $productSlug } }
      stage: PUBLISHED
      locales: pt_BR
    ) {
      id
      name
      headline
      content
      rating
      email
      createdAt
      updatedAt
    }
  }
`;
