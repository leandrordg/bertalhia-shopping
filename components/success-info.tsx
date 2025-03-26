"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/utils/format";

import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ChevronLeftIcon, ReceiptIcon } from "lucide-react";

interface Props {
  order: OrderWithOrderItems;
}

export function SuccessInfo({ order }: Props) {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col gap-4 text-center px-4 py-8 md:px-8">
      <CheckCircleIcon className="size-12 text-green-600 place-self-center" />

      <h3 className="text-xl font-bold uppercase px-4 md:px-8">
        Pedido realizado com sucesso
      </h3>

      <p className="text-sm text-muted-foreground">
        Obrigado por comprar conosco! Seu pedido foi realizado com sucesso. Em
        breve você receberá um e-mail com as informações de entrega.
      </p>

      <div className="w-full max-w-2xl mx-auto my-4">
        <div className="flex flex-col gap-4">
          {order.orderItems.map(({ product, productVariant, quantity }) => (
            <div
              key={product.id}
              className="flex items-start text-start gap-2 border rounded-xl overflow-clip p-2"
            >
              <div className="relative size-10">
                <Image src={product.images[0].url} alt={product.name} fill />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  {
                    product.variants.find(
                      (variant) => variant.id === productVariant
                    )!.name
                  }
                </p>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {quantity}x {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-center">
        <Button asChild>
          <Link href="/">
            <ChevronLeftIcon />
            Página Inicial
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/orders/${order.id}`}>
            <ReceiptIcon />
            Visualizar pedido
          </Link>
        </Button>
      </div>
    </div>
  );
}
