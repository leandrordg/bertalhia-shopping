import { getCategories } from "@/hooks/get-categories";
import { getCollections } from "@/hooks/get-collections";
import { getProducts } from "@/hooks/get-products";

import { CategoryCard } from "@/components/category-card";
import { CollectionCard } from "@/components/collection-card";
import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  const products = await getProducts();
  const collections = await getCollections();
  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      {collections[0] && (
        <div className="space-y-4">
          <CollectionCard collection={collections[0]} />
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
          Explorar produtos
        </h3>

        {!products.length && (
          <InfoCard>Não há produtos disponíveis no momento.</InfoCard>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
          Categorias em alta
        </h3>

        {!categories.length && (
          <InfoCard>Não há categorias disponíveis no momento.</InfoCard>
        )}

        {categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>

      {collections[1] && (
        <div className="space-y-4">
          <CollectionCard collection={collections[1]} />
        </div>
      )}

      <FreeShippingCard products={products} />
    </main>
  );
}
