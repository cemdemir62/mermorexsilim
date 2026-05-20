import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  
  // 1. Run auth check for admin routes
  const isLoggedIn = !!req.auth?.user;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", nextUrl));
    }
  }
  
  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
  }

  // 2. i18n Cookie Handler
  const lang = nextUrl.searchParams.get("lang");
  let response = NextResponse.next();

  if (lang === "tr" || lang === "en") {
    response.cookies.set("locale", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  } else {
    const cookieLocale = req.cookies.get("locale")?.value;
    if (!cookieLocale) {
      response.cookies.set("locale", "tr", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    }
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

