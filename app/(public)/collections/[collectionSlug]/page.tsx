import Image from "next/image";

import { getCollectionBySlugWithProducts } from "@/hooks/get-collection-by-slug-with-products";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductCard } from "@/components/product-card";

interface Props {
  params: Promise<{ collectionSlug: string }>;
}

export default async function CollectionSlugPage({ params }: Props) {
  const { collectionSlug } = await params;

  const collection = await getCollectionBySlugWithProducts(collectionSlug);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold">{collection.name}</h1>

        <p className="text-lg text-muted-foreground">
          {collection.description ?? "Sem descrição."}
        </p>

        <div className="relative mt-8 rounded-xl overflow-clip group text-center cursor-pointer bg-muted/50 hover:bg-muted transition-colors duration-300 h-72 w-full">
          <Image
            src={collection.bannerImage.url}
            alt={collection.bannerImage.fileName}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fill
          />
        </div>
      </div>

      {!collection.products.length && (
        <InfoCard>Não foram encontrados produtos nesta coleção.</InfoCard>
      )}

      {collection.products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FreeShippingCard />
    </main>
  );
}
