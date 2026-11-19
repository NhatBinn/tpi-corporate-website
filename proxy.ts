import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Chặn /admin/* (trừ trang đăng nhập /admin) với người chưa đăng nhập hoặc không phải admin.
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session?.user.role !== "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path+",
};
