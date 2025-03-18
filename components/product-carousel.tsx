import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  product: Product;
}

export function ProductCarousel({ product }: Props) {
  return (
    <Carousel className="w-full overflow-clip rounded-xl">
      <CarouselContent>
        {product.images.map((image) => (
          <CarouselItem
            key={image.id}
            className="relative w-full h-[60dvh]"
          >
            <Image
              src={image.url}
              alt={image.fileName}
              className="mix-blend-multiply object-contain p-2"
              fill
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
