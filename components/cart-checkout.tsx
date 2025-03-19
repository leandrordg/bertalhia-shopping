"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/stores/cart";
import {
  DEFAULT_SHIPPING_PRICE,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/config";
import { formatPrice } from "@/utils/format";

import { Button } from "@/components/ui/button";

interface Props {
  products: Product[];
}

export function CartCheckout({ products }: Props) {
  const { items, totalPrice } = useCartStore((state) => state);

  if (!items.length) return null;

  const hasFreeShipping = FREE_SHIPPING_THRESHOLD <= totalPrice;

  const totalPriceWithShipping =
    totalPrice + (hasFreeShipping ? 0 : DEFAULT_SHIPPING_PRICE);

  return (
    <section className="space-y-12">
      <div className="flex flex-col gap-4 bg-muted/50 p-4 md:p-8 rounded-xl">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete</span>
          <span className="text-green-600 font-medium">
            {hasFreeShipping ? "Grátis" : formatPrice(DEFAULT_SHIPPING_PRICE)}
          </span>
        </div>

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(totalPriceWithShipping)}</span>
        </div>

        <Button>Finalizar compra</Button>
      </div>

      {products.length > 0 && (
        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <hr className="flex-1" />
            <h3 className="text-xl font-bold text-muted-foreground text-center uppercase">
              Explorar
            </h3>
            <hr className="flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      )}
    </section>
  );
}
