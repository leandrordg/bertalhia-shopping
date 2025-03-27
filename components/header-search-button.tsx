import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function HeaderSearchButton() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <SearchIcon className="size-6" />
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>
              Buscar por produtos, categorias e coleções
            </DialogTitle>
            <DialogDescription>
              Encontre produtos por nome, categoria ou coleção.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>

        <form action={"/search"}>
          <Input
            name="q"
            type="search"
            placeholder="Busque por produtos na loja..."
            className="w-full"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
