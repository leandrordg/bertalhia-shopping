import { ProductCard } from "@/components/product-card";

interface Props {
  title: string;
  products: Product[];
}

export function ProductList({ title, products }: Props) {
  return (
    <section className="space-y-12">
      <h3 className="text-xl font-bold text-muted-foreground uppercase px-4 md:px-8">
        {title}
      </h3>

      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
