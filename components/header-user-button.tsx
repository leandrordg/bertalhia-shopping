import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";

import { UserRoundIcon } from "lucide-react";

export async function HeaderUserButton() {
  const session = await auth();

  return (
    <Link href="/profile">
      {session?.user ? (
        <Image
          src={session.user.image!}
          alt={session.user.name!}
          className="rounded-full"
          width={24}
          height={24}
        />
      ) : (
        <UserRoundIcon className="size-6" />
      )}
    </Link>
  );
}
