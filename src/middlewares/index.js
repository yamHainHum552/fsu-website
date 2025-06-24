import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req) {
  // Define routes to protect
  const protectedRoutes = ["/admin"];

  // Check if the current path matches a protected route
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify the JWT token
      jwt.verify(token, process.env.NEXTAUTH_SECRET);
      return NextResponse.next(); // Allow access
    } catch (error) {
      // Redirect if token verification fails
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // Allow access for non-protected routes
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to all /admin routes
};
