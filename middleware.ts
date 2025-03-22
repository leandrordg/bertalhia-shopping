import { NextResponse } from "next/server";

import { auth } from "@/auth";

const privateRoutes = ["/profile", "/orders", "/reviews"];

export default auth((req) => {
  const { auth, nextUrl } = req;

  if (!auth && privateRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  if (auth && nextUrl.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
