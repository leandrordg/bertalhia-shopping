import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/utils/format";

import { ProductSelection } from "@/components/product-selection";

interface Props {
  product: Product;
  reviews: Review[];
}

export function ProductAside({ product, reviews }: Props) {
  const categories = product.categories.filter((category) => category.id);
  const collections = product.collections.filter((collection) => collection.id);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <aside className="space-y-4 p-4">
      {reviews.length === 0 && (
        <p className="text-xs text-muted-foreground">Sem avaliações.</p>
      )}

      {reviews.length > 0 && (
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          {averageRating.toFixed(1)} estrelas &middot;&nbsp;
          {reviews.length === 1
            ? "1 avaliação"
            : `${reviews.length} avaliações`}
        </p>
      )}

      {(categories.length > 0 || collections.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
          ))}
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
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

      <div className="flex items-center justify-center gap-4">
        <div className="relative size-12">
          <Image src="/icons/visa.svg" alt="visa" fill />
        </div>
        <div className="relative size-12">
          <Image src="/icons/mastercard.svg" alt="mastercard" fill />
        </div>
        <div className="relative size-12">
          <Image src="/icons/elo.svg" alt="elo" fill />
        </div>
        <div className="relative size-12">
          <Image src="/icons/americanexpress.svg" alt="american express" fill />
        </div>
        <div className="relative size-12">
          <Image src="/icons/dinersclub.svg" alt="diners" fill />
        </div>
      </div>
    </aside>
  );
}
