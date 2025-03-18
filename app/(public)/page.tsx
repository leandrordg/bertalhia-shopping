import Image from "next/image";

import { getProducts } from "@/hooks/get-products";
import { formatPrice } from "@/utils/format";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-b from-transparent via-muted/80 backdrop-blur-2xl to-transparent rounded-xl overflow-clip group text-center p-8 cursor-pointer"
          >
            <div className="relative h-96 w-full">
              <Image
                src={product.images[0].url}
                alt={product.name}
                className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
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
        ))}
      </div>
    </main>
  );
}
