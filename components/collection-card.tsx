import Image from "next/image";
import Link from "next/link";

interface Props {
  collection: Collection;
}

export function CollectionCard({ collection }: Props) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="cursor-pointer bg-muted/50 hover:bg-muted transition-colors duration-300 rounded-xl overflow-clip">
        <Image
          src={collection.bannerImage.url}
          alt={collection.bannerImage.fileName}
          className="object-contain hover:scale-[1.01] transition-transform duration-300 mix-blend-multiply"
          width={1280}
          height={280}
        />
      </div>
    </Link>
  );
}
