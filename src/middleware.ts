import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if(pathname.startsWith("/auth")) {
    return NextResponse.next()
  }

  if(pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
  if (!token) {
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/expenses/:path*"],
};
