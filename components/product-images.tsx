import Image from "next/image";

interface Props {
  product: Product;
}

export function ProductImages({ product }: Props) {
  const images = product.images.slice(1);

  if (!images.length) return null;

  return (
    <section className="bg-muted/50 p-4 py-8 md:px-8 rounded-xl grid grid-cols-1 gap-4 md:grid-cols-2">
      {images.map((image) => (
        <div key={image.id} className="relative w-full h-96">
          <Image
            src={image.url}
            alt={image.fileName}
            fill
            className="mix-blend-multiply object-contain"
          />
        </div>
      ))}
    </section>
  );
}
