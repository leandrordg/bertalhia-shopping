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
  const addItemToCart = useCartStore((state) => state.addItem);

  const [currVariant, setCurrVariant] = useQueryState("variant", {
    defaultValue: "",
  });

  const [quantity, setQuantity] = useQueryState("quantity", {
    defaultValue: "",
  });

  const variantsWithQuantity = product.variants.filter((v) => v.quantity > 0);

  const selectedVariant = variantsWithQuantity.find(
    (v) => v.id === currVariant
  );

  const handleAddToCart = () => {
    const parsedQuantity = parseInt(quantity);

    if (!selectedVariant) return toast.error("Por favor, selecione um estilo.");

    if (isNaN(parsedQuantity) || parsedQuantity <= 0)
      return toast.error("Selecione uma quantidade válida.");

    if (parsedQuantity > selectedVariant.quantity)
      return toast.error("Quantidade indisponível.");

    const cartItem = {
      ...product,
      quantity: parseInt(quantity),
      variantId: selectedVariant.id,
    };

    addItemToCart(cartItem);

    toast.success("Produto adicionado ao carrinho!");
  };

  const onVariantChange = (value: string) => {
    setCurrVariant(value);
    setQuantity("");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-5 gap-4">
        {variantsWithQuantity.length > 0 && (
          <div className="flex flex-col gap-2 col-span-3">
            <label
              htmlFor="variant"
              className="text-sm uppercase tracking-tight font-bold truncate"
            >
              Estilos
            </label>
            <Select value={currVariant} onValueChange={onVariantChange}>
              <SelectTrigger id="variant" className="w-full" size="lg">
                <SelectValue placeholder="Selecione um estilo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {variantsWithQuantity.map((variant) => (
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
            <SelectTrigger
              id="quantity"
              className="w-full"
              size="lg"
              disabled={!selectedVariant}
            >
              <SelectValue
                placeholder={
                  !selectedVariant ? "Selecione uma variante" : "1 ou mais..."
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: selectedVariant?.quantity ?? 0 }).map(
                  (_, i) => (
                    <SelectItem key={i} value={`${i + 1}`}>
                      {i + 1} unidade{i > 0 && "s"}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        size="lg"
        disabled={!currVariant || !quantity}
        onClick={handleAddToCart}
      >
        <ShoppingBasketIcon />
        Adicionar ao carrinho
      </Button>
    </div>
  );
}
