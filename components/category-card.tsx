import Image from "next/image";
import Link from "next/link";

interface Props {
  category: Category;
}

export function CategoryCard({ category }: Props) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="rounded-xl group text-center cursor-pointer">
        <div className="relative h-72 w-full rounded-xl overflow-clip">
          <Image
            src={category.bannerImage.url}
            alt={category.bannerImage.fileName}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fill
          />
        </div>
        <div className="p-4">
          <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
            {category.name}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
