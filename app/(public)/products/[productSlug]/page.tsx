import { getProductBySlug } from "@/hooks/get-product-by-slug";
import { getReviewsByProductSlug } from "@/hooks/get-reviews-by-product-slug";
import { getSimilarProducts } from "@/hooks/get-similar-products";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { ProductAside } from "@/components/product-aside";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductImages } from "@/components/product-images";
import { ProductList } from "@/components/product-list";
import { ProductReviews } from "@/components/product-reviews";

interface Props {
  params: Promise<{ productSlug: string }>;
}

export default async function ProductSlugPage({ params }: Props) {
  const { productSlug } = await params;

  const product = await getProductBySlug(productSlug);
  const reviews = await getReviewsByProductSlug(productSlug);

  const { productsByCategory, productsByCollection } = await getSimilarProducts(
    product
  );

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <section className="flex-1">
          <ProductCarousel product={product} />
        </section>

        <section className="flex-1">
          <ProductAside product={product} reviews={reviews} />
        </section>
      </div>

      <FreeShippingCard />

      <ProductImages product={product} />

      <ProductReviews reviews={reviews} />

      <ProductList
        title="Você Também Pode Gostar"
        products={productsByCategory}
      />

      <ProductList
        title="Complete Seu Estilo"
        products={productsByCollection}
      />
    </main>
  );
}
