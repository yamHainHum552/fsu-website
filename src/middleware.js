// middleware.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only apply protection to specified paths
  const protectedPaths = ["/admin", "/api"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Try to get token from cookie
  let token = req.cookies.get("token")?.value;

  // If not in cookie, check Authorization header (Bearer token)
  if (!token && req.headers.get("authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("authorization")?.replace("Bearer ", "");
  }

  if (!token) {
    console.log("🔐 No token provided");

    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
