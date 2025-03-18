import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/hooks/get-categories";
import { getCollections } from "@/hooks/get-collections";

import { HeaderCartButton } from "@/components/header-cart-button";
import { HeaderSearchButton } from "@/components/header-search-button";

export async function Header() {
  const categories = await getCategories();
  const collections = await getCollections();

  return (
    <header className="h-24 bg-background">
      <div className="flex items-center gap-8 h-full max-w-7xl mx-auto px-4 lg:px-8">
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

        <nav className="hidden md:flex gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-sm text-foreground/80 hover:text-foreground font-light"
            >
              {category.name}
            </Link>
          ))}
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="text-sm text-foreground/80 hover:text-foreground font-light"
            >
              {collection.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <HeaderSearchButton />
          <HeaderCartButton />
        </div>
      </div>
    </header>
  );
}
