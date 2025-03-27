import { getCollectionBySlugWithProducts } from "@/hooks/get-collection-by-slug-with-products";
import { getProducts } from "@/hooks/get-products";

import { CollectionCard } from "@/components/collection-card";
import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductCard } from "@/components/product-card";

interface Props {
  params: Promise<{ collectionSlug: string }>;
}

export default async function CollectionSlugPage({ params }: Props) {
  const { collectionSlug } = await params;

  const products = await getProducts();
  const collection = await getCollectionBySlugWithProducts(collectionSlug);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold">{collection.name}</h1>

        <p className="text-lg text-muted-foreground">
          {collection.description ?? "Sem descrição."}
        </p>

        <CollectionCard collection={collection} />
      </div>

      {!collection.products.length && (
        <InfoCard>Não foram encontrados produtos nesta coleção.</InfoCard>
      )}

      {collection.products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FreeShippingCard products={products} />
    </main>
  );
}
