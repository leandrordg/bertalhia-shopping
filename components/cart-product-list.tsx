"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/utils/format";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from "lucide-react";

interface Props {
  products: Product[];
}

export function CartProductList({}: Props) {
  const { items, removeItem, updateQuantity } = useCartStore((state) => state);

  return (
    <section className="space-y-12">
      {!items.length && (
        <div className="flex flex-col items-center text-center justify-center gap-4 p-8 bg-muted/50 rounded-xl">
          <ShoppingCartIcon className="size-6 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground text-center">
            Adicione produtos ao carrinho clicando no botão "Adicionar ao
            carrinho".
          </p>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Ver produtos
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const selectedVariant = item.variants.find(
              (v) => v.id === item.variantId
            );
            const totalItemPrice = item.price * item.quantity;

            return (
              <div
                key={item.id + item.variantId}
                className="flex gap-4 md:gap-8 md:items-center p-4 md:p-8 bg-muted/50 rounded-xl"
              >
                <Link href={`/products/${item.slug}`}>
                  <div className="relative size-12 sm:size-20 md:size-28 shrink-0">
                    <Image
                      src={item.images[0].url}
                      alt={item.name}
                      className="object-contain"
                      fill
                    />
                  </div>
                </Link>

                <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center flex-1">
                  <div className="flex-[3] space-y-1.5">
                    {selectedVariant && (
                      <p className="text-sm">{selectedVariant.name}</p>
                    )}

                    <h2 className="text-lg font-semibold">{item.name}</h2>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex md:flex-col-reverse items-center flex-[2]">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.variantId,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      <ChevronLeftIcon className="size-6 md:-rotate-90 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                    <div className="h-8 w-12 flex items-center justify-center">
                      <span>{item.quantity}</span>
                    </div>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.variantId,
                          item.quantity + 1
                        )
                      }
                    >
                      <ChevronRightIcon className="size-6 md:-rotate-90 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                  </div>

                  <div className="md:text-right shrink-0 md:space-y-1.5 md:min-w-32">
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)}/un
                    </p>
                    <p className="text-lg font-bold tracking-tight">
                      {formatPrice(totalItemPrice)}
                    </p>
                    <button
                      className="text-sm text-muted-foreground cursor-pointer"
                      onClick={() => removeItem(item.id, item.variantId)}
                    >
                      Remover item
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
