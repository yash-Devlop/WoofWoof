import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export function middleware(request) {
  // Check if the route starts with /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/adminPortal", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

export const runtime = "nodejs";
