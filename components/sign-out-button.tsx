import { signOut } from "@/auth";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

interface Props {
  className?: string;
}

export function SignOutButton({ className }: Props) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className={className}
    >
      <Button type="submit" variant="outline" className="w-full">
        <LogOutIcon /> Sair
      </Button>
    </form>
  );
}
