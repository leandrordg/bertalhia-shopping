import { getSearchResults } from "@/hooks/get-search-results";

import { CategoryCard } from "@/components/category-card";
import { CollectionCard } from "@/components/collection-card";
import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductCard } from "@/components/product-card";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const { products, categories, collections } = await getSearchResults(q);

  const totalResults = products.length + categories.length + collections.length;

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <h1 className="text-lg text-muted-foreground px-4 md:px-8">
        Exibindo {totalResults} resultados para a busca:{" "}
        <strong className="text-foreground">{q}</strong>.
      </h1>

      {!products.length && !categories.length && !collections.length && (
        <InfoCard>
          Nenhum resultado encontrado para a busca <strong>{q}</strong>.
        </InfoCard>
      )}

      {products.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
            Produtos encontrados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
            Categorias encontradas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      {collections.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
            Coleções encontradas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      )}

      <FreeShippingCard />
    </main>
  );
}
