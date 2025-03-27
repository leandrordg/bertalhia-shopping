import { getProducts } from "@/hooks/get-products";
import { getSearchResults } from "@/hooks/get-search-results";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";
import { ProductCard } from "@/components/product-card";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const allProducts = await getProducts();
  const products = await getSearchResults(q);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <h1 className="text-lg text-muted-foreground px-4 md:px-8">
        Exibindo {products.length} resultados para a busca:{" "}
        <strong className="text-foreground">{q}</strong>.
      </h1>

      {!products.length && (
        <InfoCard>
          Nenhum resultado encontrado para a busca <strong>{q}</strong>.
        </InfoCard>
      )}

      {products.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
            Produtos encontrados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <FreeShippingCard products={allProducts} />
    </main>
  );
}
