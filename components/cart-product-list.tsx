"use client";

import Link from "next/link";

import { useCartStore } from "@/stores/cart";
import { validateProducts } from "@/utils/validate-products";

import { ProductCartCard } from "@/components/product-cart-card";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

interface Props {
  products: Product[];
}

export function CartProductList({ products }: Props) {
  const { items } = useCartStore((state) => state);

  const { activeProducts, inactiveProducts } = validateProducts(
    products,
    items
  );

  return (
    <section className="space-y-12">
      {!activeProducts.length && (
        <div className="flex flex-col items-center text-center justify-center gap-4 p-8 bg-muted/50 rounded-xl">
          <ShoppingCartIcon className="size-6 text-muted-foreground" />

          <h2 className="text-lg font-semibold">Seu carrinho está vazio</h2>

          <p className="text-muted-foreground text-center">
            Adicione produtos ao carrinho clicando no botão {'"'}Adicionar ao
            carrinho{'"'}.
          </p>

          <Button variant="default" asChild>
            <Link href="/">Ver produtos</Link>
          </Button>
        </div>
      )}

      {(activeProducts.length > 0 || inactiveProducts.length > 0) && (
        <div className="flex flex-col gap-4">
          {activeProducts.map((product) => (
            <ProductCartCard
              key={product.id + product.variantId}
              product={product}
            />
          ))}

          {inactiveProducts.map((product) => (
            <ProductCartCard
              key={product.id + product.variantId}
              product={product}
              inactive
            />
          ))}
        </div>
      )}
    </section>
  );
}
