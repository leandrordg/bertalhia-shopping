"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/utils/format";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

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
        "flex flex-col md:flex-row gap-4 md:gap-8 md:items-start p-4 py-8 md:px-8 transition-colors",
        inactive && "rounded-xl bg-muted/50 opacity-50"
      )}
    >
      <Link href={`/products/${product.slug}?variant=${product.variantId}`}>
        <div className="relative size-8 sm:size-16 md:size-28 shrink-0">
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

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center flex-1 md:flex-none">
              {!inactive && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        product.variantId,
                        product.quantity - 1
                      )
                    }
                  >
                    <ChevronLeftIcon className="text-muted-foreground hover:text-foreground transition-colors" />
                  </Button>
                  <div className="flex-1 min-w-12 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">
                      {product.quantity}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        product.variantId,
                        product.quantity + 1
                      )
                    }
                  >
                    <ChevronRightIcon className="text-muted-foreground hover:text-foreground transition-colors" />
                  </Button>
                </>
              )}
            </div>

            <Button
              size="sm"
              variant="outline"
              className="flex-[2] md:flex-none md:!px-8"
              onClick={() => removeItem(product.id, product.variantId)}
            >
              <TrashIcon />
              Remover
            </Button>
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
    </div>
  );
}
