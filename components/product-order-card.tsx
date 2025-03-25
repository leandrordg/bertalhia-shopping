import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/utils/format";

interface Props {
  product: Product;
  variant: string;
  quantity: number;
}

export function ProductOrderCard({ product, variant, quantity }: Props) {
  const selectedVariant = product.variants.find((v) => v.id === variant);

  const totalItemPrice = product.price * quantity;

  return (
    <div
      key={product.id + variant}
      className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start p-4 py-8 md:px-8 transition-colors"
    >
      <Link href={`/products/${product.slug}?variant=${variant}`}>
        <div className="relative size-8 sm:size-16 lg:size-28 shrink-0">
          <Image
            src={product.images[0].url}
            alt={product.name}
            className="object-contain mix-blend-multiply"
            fill
          />
        </div>
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex-[3] space-y-1">
          <p className="text-sm text-muted-foreground">
            {selectedVariant?.name}
          </p>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-lg font-bold tracking-tight">
            {formatPrice(totalItemPrice)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatPrice(product.price)}/un
          </p>
        </div>
      </div>
    </div>
  );
}
