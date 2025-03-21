"use client";

import { useCartStore } from "@/stores/cart";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingBasketIcon } from "lucide-react";

interface Props {
  product: Product;
}

export function ProductSelection({ product }: Props) {
  const variants = product.variants.filter((variant) => variant.id);

  const [quantity, setQuantity] = useQueryState("quantity", {
    defaultValue: "1",
  });

  const [currVariant, setCurrVariant] = useQueryState("variant", {
    defaultValue: "",
  });

  const addItemToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const selectedVariant = variants
      ? variants.find((v) => v.id === currVariant)
      : null;

    const cartItem = {
      ...product,
      quantity: parseInt(quantity),
      variantId: selectedVariant ? selectedVariant.id : "",
    };

    addItemToCart(cartItem);

    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-5 gap-4">
        {variants.length > 0 && (
          <div className="flex flex-col gap-2 col-span-3">
            <label
              htmlFor="variant"
              className="text-sm uppercase tracking-tight font-bold truncate"
            >
              Estilos
            </label>
            <Select
              value={currVariant}
              onValueChange={(value) => setCurrVariant(value)}
            >
              <SelectTrigger id="variant" className="w-full" size="lg">
                <SelectValue placeholder="Selecione um estilo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex flex-col gap-2 col-span-2">
          <label
            htmlFor="quantity"
            className="text-sm uppercase tracking-tight font-bold truncate"
          >
            Quantidade
          </label>

          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger id="quantity" className="w-full" size="lg">
              <SelectValue placeholder="1 ou mais" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[1, 2, 3, 4, 5].map((quantity) => (
                  <SelectItem key={quantity} value={`${quantity}`}>
                    {quantity}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        size="lg"
        disabled={variants.length > 0 && !currVariant}
        onClick={handleAddToCart}
      >
        <ShoppingBasketIcon />
        Adicionar ao carrinho
      </Button>
    </div>
  );
}
