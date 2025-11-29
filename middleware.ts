// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/profile"];
const AUTH_ROUTES = ["/login", "/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If request is already on login or any /auth pages, do nothing
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Check if the route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If unauthenticated and trying to access protected route
  if (isProtectedRoute && !refreshToken) {
    console.log(`Blocked access to ${pathname}. Redirecting to login.`);

    const loginUrl = new URL("/login", request.url);

    // Only add redirect param if NOT coming from auth pages
    if (!isAuthRoute) {
      loginUrl.searchParams.set("redirect", pathname);
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/auth/:path*"],
};
