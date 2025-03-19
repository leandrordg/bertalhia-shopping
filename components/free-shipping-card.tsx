"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/stores/cart";

import { ShippingProgress } from "@/components/shipping-progress";
import { Button } from "@/components/ui/button";
import { TruckIcon } from "lucide-react";

export function FreeShippingCard() {
  const { items, totalPrice } = useCartStore((state) => state);

  const FREE_SHIPPING_THRESHOLD = 200;

  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  if (isFreeShipping) {
    return (
      <div className="flex flex-col gap-4 items-center text-center bg-green-100 border-green-300 text-green-700 p-8 rounded-xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-transparent to-green-100 z-10" />
          <div className="flex items-center justify-center *:not-first:-ml-2">
            {items.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="relative size-14 rounded-full overflow-clip border-2 shrink-0"
              >
                <Image src={item.images[0].url} alt={item.name} fill />
              </div>
            ))}
          </div>
        </div>

        <ShippingProgress
          totalPrice={totalPrice}
          freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
        />

        <p className="text-sm">
          Compre mais produtos e ganhe FRETE GRÁTIS para todo o Brasil.
        </p>

        <Button variant="shipping" asChild>
          <Link href="/cart">Ver meu carrinho</Link>
        </Button>
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
        <span className="font-bold">R$ 200,00</span>, válido para todo o Brasil.
      </p>

      <Button variant="shipping" asChild>
        <Link href="/cart">Comprar agora</Link>
      </Button>
    </div>
  );
}
