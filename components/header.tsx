"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/stores/cart";

import { ShoppingBasketIcon } from "lucide-react";

export function Header() {
  const itemsCount = useCartStore((state) => state.itemsCount);

  return (
    <header className="h-24 bg-background">
      <div className="flex items-center h-full max-w-7xl mx-auto px-4 lg:px-8">
        <Link href="/">
          <div className="relative w-32 h-10">
            <Image
              src="/logo-horizontal-two.png"
              alt="bertalhia shopping"
              className="object-contain mix-blend-multiply"
              fill
            />
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingBasketIcon />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs text-white bg-indigo-700 rounded-full size-4 flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
