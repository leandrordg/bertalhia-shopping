import Image from "next/image";
import Link from "next/link";

interface Props {
  collection: Collection;
}
export function CollectionCard({ collection }: Props) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="rounded-xl overflow-clip group text-center p-8 cursor-pointer bg-muted/50 hover:bg-muted transition-colors duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={collection.images[0].url}
            alt={collection.images[0].fileName}
            className="mix-blend-multiply object-contain group-hover:scale-105 transition-transform duration-300"
            fill
          />
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
            {collection.name}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {collection.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
