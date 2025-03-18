import Link from "next/link";

import { getCategories } from "@/hooks/get-categories";
import { getCollections } from "@/hooks/get-collections";
import { getProducts } from "@/hooks/get-products";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  const products = await getProducts();
  const collections = await getCollections();
  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
          Coleções em destaque
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.slug}`}>
              <div className="bg-muted/50 rounded-xl overflow-clip group flex flex-col items-center justify-center text-center gap-1.5 p-8 cursor-pointer min-h-48">
                <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
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

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
          Explorar produtos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
          Categorias em alta
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <div className="bg-muted/50 rounded-xl overflow-clip group flex flex-col items-center justify-center text-center gap-1.5 p-8 cursor-pointer min-h-48">
                <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
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

      <FreeShippingCard />
    </main>
  );
}
