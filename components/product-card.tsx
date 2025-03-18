import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/utils/format";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="rounded-xl overflow-clip group text-center p-8 cursor-pointer hover:bg-muted/50 transition-colors duration-300">
        <div className="relative h-96 w-full">
          <Image
            src={product.images[0].url}
            alt={product.name}
            className="mix-blend-multiply object-contain group-hover:scale-105 transition-transform duration-300"
            fill
          />
        </div>

        <div className="mt-4">
          <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
            {product.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
