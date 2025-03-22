import { signIn } from "@/auth";
import { GoogleIcon } from "@/utils/icons";

import { Button } from "@/components/ui/button";

export function AuthGoogleButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button type="submit" size="wider" variant="outline">
        <GoogleIcon className="size-4" />
        Continuar com Google
      </Button>
    </form>
  );
}
