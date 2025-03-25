"use client";

import { useRouter } from "next/navigation";

import { checkout } from "@/actions/checkout";
import { useCartStore } from "@/stores/cart";
import {
  DEFAULT_SHIPPING_PRICE,
  FREE_SHIPPING_THRESHOLD,
} from "@/utils/config";
import { formatPrice } from "@/utils/format";
import { validateProducts } from "@/utils/validate-products";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface Props {
  products: Product[];
}

export function CartCheckout({ products }: Props) {
  const router = useRouter();

  const { data: session } = useSession();
  const { items } = useCartStore((state) => state);

  const { activeProducts } = validateProducts(products, items);

  const totalPrice = activeProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const hasFreeShipping = FREE_SHIPPING_THRESHOLD <= totalPrice;

  const totalPriceWithShipping =
    totalPrice + (hasFreeShipping ? 0 : DEFAULT_SHIPPING_PRICE);

  const handleCheckout = async () => {
    if (!items.length) return;

    if (!session) return router.push("/sign-in");

    await checkout(items);
  };

  return (
    <section className="space-y-12">
      <div className="flex flex-col gap-4 bg-muted/50 p-4 py-8 md:px-8 rounded-xl">
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

        <Button onClick={handleCheckout}>Finalizar compra</Button>
      </div>
    </section>
  );
}
