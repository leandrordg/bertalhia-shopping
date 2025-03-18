import Link from "next/link";

import { formatPrice } from "@/utils/format";

import { ProductSelection } from "@/components/product-selection";

interface Props {
  product: Product;
}

export function ProductAside({ product }: Props) {
  const categories = product.categories.filter((category) => category.id);
  const collections = product.collections.filter((collection) => collection.id);

  return (
    <aside className="space-y-4 p-4">
      {(categories.length > 0 || collections.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-muted-foreground"
            >
              {category.name}
            </Link>
          ))}
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="text-muted-foreground"
            >
              {collection.name}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">
        {product.name}
      </h1>

      <p className="text-2xl md:text-3xl font-bold text-indigo-800 tracking-tighter">
        {formatPrice(product.price)}
      </p>

      <p className="leading-relaxed text-muted-foreground">
        {product.description ?? "Sem descrição."}
      </p>

      <ProductSelection product={product} />
    </aside>
  );
}
