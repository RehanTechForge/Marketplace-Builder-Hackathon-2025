import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "./sanity/customers/getUserById";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/shop",
  "/shop/(.*)", // Allow all product routes
  "/categories/(.*)", // Allow all category routes
  "/api/(.*)", // Public API routes
];

// Routes that require admin access
const adminRoutes = [
  "/dashboard",
  "/dashboard/(.*)", // All dashboard routes
  "/admin",
  "/admin/(.*)", // All admin routes
];

export default clerkMiddleware({
  // @ts-expect-error is deprecated in favor of returning a middleware function
  publicRoutes: publicRoutes,
  afterAuth: async (auth: any, req: NextRequest) => {
    console.log("Auth", auth);

    const currentPath = req.nextUrl.pathname;

    // Check if attempting to access admin routes
    const isAdminRoute = adminRoutes.some((route) =>
      currentPath.startsWith(route)
    );

    // For admin routes, we need to check authentication and admin status
    if (isAdminRoute) {
      // If not authenticated, redirect to sign-in
      if (!auth.userId) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("redirect_url", req.url);
        return NextResponse.redirect(signInUrl);
      }

      try {
        // Fetch user data from Sanity
        const userData = await getUserById(auth.userId);

        // If no user data found or user is not admin
        if (!userData || !userData.isAdmin) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        // User is admin, allow access
        return NextResponse.next();
      } catch (error) {
        console.error("Error checking admin status:", error);
        return NextResponse.redirect(new URL("/error", req.url));
      }
    }

    // For non-admin protected routes
    const isPublicRoute = publicRoutes.some((route) =>
      currentPath.startsWith(route)
    );

    // If it's not a public route and user is not authenticated
    if (!isPublicRoute && !auth.userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
