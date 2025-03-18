import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/hooks/get-categories";
import { getCollections } from "@/hooks/get-collections";
import { getProducts } from "@/hooks/get-products";
import { formatPrice } from "@/utils/format";

import { FreeShippingCard } from "@/components/free-shipping-card";

export default async function HomePage() {
  const products = await getProducts();
  const collections = await getCollections();
  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.slug}`}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <div className="bg-muted/50 rounded-xl overflow-clip group text-center p-8 cursor-pointer">
              <div className="relative h-96 w-full">
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  className="mix-blend-multiply object-contain group-hover:scale-105 transition-transform duration-500"
                  fill
                />
              </div>

              <div className="mt-4">
                <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                  {product.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

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

      <FreeShippingCard />
    </main>
  );
}
