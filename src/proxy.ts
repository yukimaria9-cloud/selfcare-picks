import { NextRequest, NextResponse } from "next/server";

const locales = ["ja", "en"];
const defaultLocale = "ja";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocalePrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // favicon.ico/robots.txt/sitemap.xml と同様、icon・apple-icon(next/ogで生成される
  // favicon/apple-touch-icon。拡張子を含まないURLのため「.*\..*」除外に引っかからない)も
  // ロケールリダイレクトの対象から除外する。除外しないと/ja/iconへリダイレクトされ404になる。
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|icon|apple-icon|.*\\..*).*)"],
};
