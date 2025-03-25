"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/utils/format";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  product: CartItem;
  inactive?: boolean;
}

export function ProductCartCard({ product, inactive }: Props) {
  const { removeItem, updateQuantity } = useCartStore((state) => state);

  const selectedVariant = product.variants.find(
    (v) => v.id === product.variantId
  );

  const totalItemPrice = product.price * product.quantity;

  return (
    <div
      key={product.id + product.variantId}
      className={cn(
        "flex gap-4 md:gap-8 md:items-center p-4 py-8 md:px-8 rounded-xl transition-colors",
        inactive && "bg-muted/50 opacity-50"
      )}
    >
      <Link href={`/products/${product.slug}?variant=${product.variantId}`}>
        <div className="relative size-12 sm:size-20 md:size-28 shrink-0">
          <Image
            src={product.images[0].url}
            alt={product.name}
            className="object-contain mix-blend-multiply"
            fill
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center flex-1">
        <div className="flex-[3] space-y-1">
          <p className="text-sm text-muted-foreground">
            {selectedVariant?.name}
          </p>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex md:flex-col-reverse items-center flex-[2]">
          {!inactive && (
            <>
              <button
                onClick={() =>
                  updateQuantity(
                    product.id,
                    product.variantId,
                    product.quantity - 1
                  )
                }
              >
                <ChevronLeftIcon className="size-6 md:-rotate-90 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
              <div className="h-8 w-12 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  {product.quantity}
                </span>
              </div>
              <button
                onClick={() =>
                  updateQuantity(
                    product.id,
                    product.variantId,
                    product.quantity + 1
                  )
                }
              >
                <ChevronRightIcon className="size-6 md:-rotate-90 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </>
          )}
        </div>

        <div className="md:text-right shrink-0 md:space-y-1.5 md:min-w-32">
          <p className="text-sm text-muted-foreground">
            {formatPrice(product.price)}/un
          </p>
          <p className="text-lg font-bold tracking-tight">
            {formatPrice(totalItemPrice)}
          </p>
          <button
            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={() => removeItem(product.id, product.variantId)}
          >
            Remover item
          </button>
        </div>
      </div>
    </div>
  );
}
