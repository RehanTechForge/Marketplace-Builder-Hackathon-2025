// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   // console.log("Token", token);

//   const isAdminUser = token?.isAdmin === true;

//   // Define the public routes
//   const publicRoutes = ["/auth/login", "/auth/signup", "/"];

//   // Check if the current route is a public route
//   const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

//   // If user is logged in and tries to access a public route
//   if (token && isPublicRoute) {
//     // Only allow admin users to access the dashboard
//     if (isAdminUser) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     } else {
//       // Non-admin users are redirected to a different page, e.g., "/user-home"
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // If user is not logged in and tries to access a protected route
//   if (!token && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // If user is logged in but not an admin and tries to access the dashboard
//   if (
//     token &&
//     !isAdminUser &&
//     request.nextUrl.pathname.startsWith("/dashboard")
//   ) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/auth/login",
//     "/auth/signup",
//     "/dashboard/:path*",
//     "/user-home",
//   ],
// };
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAdminUser = token?.isAdmin === true;

  // Define the public routes
  const publicRoutes = ["/auth/login", "/auth/signup"];

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // If user is logged in and tries to access login or signup
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not logged in and tries to access a protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Handle access to the home page ("/")
  if (request.nextUrl.pathname === "/") {
    if (!token) {
      // If not logged in, redirect to login page
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      // If logged in (admin or non-admin), redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If user is logged in but not an admin and tries to access admin-only routes
  if (token && !isAdminUser && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/signup",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
