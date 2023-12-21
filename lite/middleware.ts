import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let cookie = request.cookies.get("NEXT_LOCALE");
  let cookielang = cookie?.value;

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (
    [
      "/manifest.json",
      "/favicon.ico",
      "/60.png",
      "/bg.avif",
      "/login.svg",
      "/light_home.png",
      "/dark_home.png",
      "/ios_home_dark.png",
      "/ios_home_light.png",
      "/ios_user_dark.png",
      "/ios_user_light.png",
      "/chat_dark_iphone.png",
      "/chat_light_iphone.png",
      "/chat_light_mac.png",
      "/chat_dark_mac.png",
      "/download_dark_iphone.svg",
      "/download_dark_mac.svg",
      "/app/image.57x57.png",
      "/app/image.512x512.png",
      "/app/nextwiki.ipa",
      "/app/nextwiki.dmg",
      "/app/manifest.plist",
      "/app/nextwiki-78E7A04F-815C-4A17-8FFF-4524C662C1C9.ipa",
      "/app/nextwiki-03892D09-17D5-4E6D-AA65-BC4E8E03D3BA.ipa",
      "/app/nextwiki-D229854A-F322-4A6A-ABF9-8C92ADBF214E.ipa",
      "/app/nextwiki-F26B0A76-9742-4396-A567-F35D4B7886AB.ipa"
      // Your other files in `public`
    ].includes(pathname)
  )
    return;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = cookielang ? cookielang : getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  } else {
    // console.log("path not miss:",pathname)
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
