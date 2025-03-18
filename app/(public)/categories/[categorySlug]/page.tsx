import Image from "next/image";
import Link from "next/link";

import { getCategoryBySlugWithProducts } from "@/hooks/get-category-by-slug-with-products";
import { formatPrice } from "@/utils/format";

import { FreeShippingCard } from "@/components/free-shipping-card";
import { InfoCard } from "@/components/info-card";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export default async function CategorySlugPage({ params }: Props) {
  const { categorySlug } = await params;

  const category = await getCategoryBySlugWithProducts(categorySlug);

  return (
    <main className="max-w-7xl mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-semibold text-center">{category.name}</h1>

      <div className="text-center">
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
      )}

      <FreeShippingCard />
    </main>
  );
}
