"use client";

import Form from "next/form";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">
        <SearchIcon className="size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buscar por produtos, categorias e coleções</DialogTitle>
          <DialogDescription>
            Encontre produtos por nome, categoria ou coleção.
          </DialogDescription>
        </DialogHeader>

        <Form action={"/search"} onSubmit={() => setOpen(false)}>
          <Input
            type="search"
            name="q"
            value={search}
            placeholder="Buscar por produtos"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
