import { headers } from "next/headers";

export async function getLocale(): Promise<string> {
  const headerList = await headers();
  const acceptLanguage = headerList.get("accept-language") || "en-US";
  return acceptLanguage.split(",")[0].replace("-", "_");
}
