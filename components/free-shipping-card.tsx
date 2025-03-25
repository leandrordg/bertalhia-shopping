"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/stores/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/utils/config";
import { formatPrice } from "@/utils/format";
import { validateProducts } from "@/utils/validate-products";

import { ShippingProgress } from "@/components/shipping-progress";
import { Button } from "@/components/ui/button";
import { TruckIcon } from "lucide-react";

interface Props {
  products: Product[];
}

export function FreeShippingCard({ products }: Props) {
  const { items } = useCartStore((state) => state);

  const { activeProducts } = validateProducts(products, items);

  const totalPrice = activeProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const priceRemaining = FREE_SHIPPING_THRESHOLD - totalPrice;
  const isFreeShipping = FREE_SHIPPING_THRESHOLD <= totalPrice;

  if (isFreeShipping) {
    return (
      <div className="flex flex-col gap-4 items-center text-center bg-green-100 border-green-300 text-green-700 p-8 rounded-xl">
        <div className="flex items-center justify-center *:not-first:-ml-4">
          {activeProducts.slice(0, 8).map((item) => (
            <Link
              key={item.id + item.variantId}
              href={`/products/${item.slug}?variant=${item.variantId}`}
            >
              <div className="relative size-14 rounded-full overflow-clip bg-muted border-2 shrink-0">
                <Image src={item.images[0].url} alt={item.name} fill />
              </div>
            </Link>
          ))}
        </div>

        <p>
          Parabéns! Você ganhou <strong>FRETE GRÁTIS</strong> para esta compra.
        </p>

        <ShippingProgress progress={progress} />

        <p className="text-sm">
          Finalize sua compra agora mesmo e garanta a entrega gratuita até a sua
          casa.
        </p>

        <Button variant="shipping" asChild>
          <Link href="/cart">Ver meu carrinho</Link>
        </Button>
      </div>
    );
  }

  if (progress > 0 && progress < 100) {
    return (
      <div className="flex flex-col gap-4 items-center text-center bg-green-100 border-green-300 text-green-700 p-8 rounded-xl">
        <div className="flex items-center justify-center *:not-first:-ml-4">
          {activeProducts.slice(0, 8).map((item) => (
            <Link
              key={item.id + item.variantId}
              href={`/products/${item.slug}?variant=${item.variantId}`}
            >
              <div className="relative size-14 rounded-full overflow-clip bg-muted border-2 shrink-0">
                <Image src={item.images[0].url} alt={item.name} fill />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-sm">
          Adicione mais <strong>{formatPrice(priceRemaining)}</strong> ao
          carrinho e ganhe <strong>FRETE GRÁTIS</strong> para todo o Brasil.
        </p>

        <ShippingProgress progress={progress} />

        <p className="text-sm">
          Entrega <strong>GRÁTIS</strong> para todo o Brasil em compras acima de{" "}
          <strong>{formatPrice(FREE_SHIPPING_THRESHOLD)}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center text-center bg-green-100 border-green-300 text-green-700 p-8 rounded-xl">
      <TruckIcon className="size-6" />

      <p>
        Entrega <span className="font-bold">GRÁTIS</span> para todo o Brasil.
      </p>

      <p className="text-sm">
        Adquira frete grátis comprando produtos acima de{" "}
        <span className="font-bold">
          {formatPrice(FREE_SHIPPING_THRESHOLD).replace(",00", "")}
        </span>
        , válido para todo o Brasil.
      </p>
    </div>
  );
}
