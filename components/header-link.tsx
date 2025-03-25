"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

interface Props {
  id: string;
  name: string;
  href: string;
}

export function HeaderLink({ id, name, href }: Props) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      key={id}
      href={href}
      className={cn(
        "text-sm text-foreground/70 hover:text-foreground transition-colors",
        isActive && "text-foreground"
      )}
    >
      {name}
    </Link>
  );
}
