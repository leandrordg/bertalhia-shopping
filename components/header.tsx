import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/hooks/get-categories";
import { getCollections } from "@/hooks/get-collections";

import { HeaderCartButton } from "@/components/header-cart-button";
import { HeaderLink } from "@/components/header-link";
import { HeaderSearchButton } from "@/components/header-search-button";
import { HeaderUserButton } from "@/components/header-user-button";

export async function Header() {
  const categories = await getCategories();
  const collections = await getCollections();

  return (
    <header className="h-24 bg-background">
      <div className="flex items-center gap-8 h-full max-w-7xl mx-auto px-4 md:px-8">
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
            <HeaderLink
              key={category.id}
              id={category.id}
              name={category.name}
              href={`/categories/${category.slug}`}
            />
          ))}
          {collections.map((collection) => (
            <HeaderLink
              key={collection.id}
              id={collection.id}
              name={collection.name}
              href={`/collections/${collection.slug}`}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <HeaderSearchButton />
          <HeaderCartButton />
          <HeaderUserButton />
        </div>
      </div>
    </header>
  );
}
