import { getProductBySlug } from "@/hooks/get-product-by-slug";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { ProductAside } from "@/components/product-aside";
import { ProductCarousel } from "@/components/product-carousel";

interface Props {
  params: Promise<{ productSlug: string }>;
}

export default async function ProductSlugPage({ params }: Props) {
  const { productSlug } = await params;

  const product = await getProductBySlug(productSlug);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <section className="flex-1">
          <ProductCarousel product={product} />
        </section>

        <section className="flex-1">
          <ProductAside product={product} />
        </section>
      </div>

      <FreeShippingCard />
    </main>
  );
}
