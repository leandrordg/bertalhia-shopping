import Image from "next/image";
import Link from "next/link";

interface Props {
  collection: Collection;
}

export function CollectionCard({ collection }: Props) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="relative rounded-xl overflow-clip group text-center cursor-pointer bg-muted/50 hover:bg-muted transition-colors duration-300 h-72 w-full">
        <Image
          src={collection.bannerImage.url}
          alt={collection.bannerImage.fileName}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          fill
        />
      </div>
    </Link>
  );
}
