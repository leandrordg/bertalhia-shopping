import Link from "next/link";

import { getSearchResults } from "@/hooks/get-search-results";

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
      <h1 className="text-xl md:text-2xl font-medium px-4 md:px-8">
        Exibindo {totalResults} resultados para a busca: <strong>{q}</strong>.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <div className="bg-muted/50 rounded-xl overflow-clip group flex flex-col items-center justify-center text-center gap-1.5 p-8 cursor-pointer min-h-48">
                  <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                    {category.name}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {category.description ?? "Sem descrição."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {collections.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
            Coleções encontradas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
              >
                <div className="bg-muted/50 rounded-xl overflow-clip group flex flex-col items-center justify-center text-center gap-1.5 p-8 cursor-pointer min-h-48">
                  <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                    {collection.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {collection.description ?? "Sem descrição."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <FreeShippingCard />
    </main>
  );
}
