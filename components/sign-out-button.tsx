import { signOut } from "@/auth";

import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit" size="wider" variant="outline">
        Sair da conta
      </Button>
    </form>
  );
}
