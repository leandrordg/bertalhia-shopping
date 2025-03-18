import { getCategoryBySlugWithProducts } from "@/hooks/get-category-by-slug-with-products";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductCard } from "@/components/product-card";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export default async function CategorySlugPage({ params }: Props) {
  const { categorySlug } = await params;

  const category = await getCategoryBySlugWithProducts(categorySlug);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold">{category.name}</h1>

        <p className="text-lg text-muted-foreground">
          {category.description ?? "Sem descrição."}
        </p>
      </div>

      {!category.products.length && (
        <InfoCard>Não foram encontrados produtos para esta categoria.</InfoCard>
      )}

      {category.products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FreeShippingCard />
    </main>
  );
}
