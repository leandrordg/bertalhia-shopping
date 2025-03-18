"use client";

import Link from "next/link";

import { useCartStore } from "@/stores/cart";

import { ShoppingBasketIcon } from "lucide-react";

export function HeaderCartButton() {
  const itemsCount = useCartStore((state) => state.itemsCount);

  return (
    <Link href="/cart" className="relative">
      <ShoppingBasketIcon className="size-6" />
      {itemsCount > 0 && (
        <span className="absolute -top-1 -right-1 text-xs text-white bg-indigo-700 rounded-full size-4 flex items-center justify-center">
          {itemsCount}
        </span>
      )}
    </Link>
  );
}
