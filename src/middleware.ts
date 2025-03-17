import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up", "/forgot-password"];
const LOGIN_URL = "/sign-in";
const HOME_URL = "/home";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!request.cookies.get("accessToken")?.value;

  console.log(pathname);
  console.log(isAuthenticated);

  // Check if the current path is a public route
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`) ||
      (route === "/" && pathname === "/"),
  );

  // If the current path is not a public route and is not authenticated -> redirect to login
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  // If the user is authenticated and is on the login/register page -> redirect to home
  if (isAuthenticated && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL(HOME_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (public files)
     * 4. /images (image files)
     * 5. All files in public folder (favicon.ico, robots.txt, etc.)
     */
    "/((?!api|_next|static|images|.*\\.|favicon.ico).*)",
  ],
};
