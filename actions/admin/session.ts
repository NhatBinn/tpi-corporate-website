"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Đăng xuất phía server (giống đăng nhập qua ChkLoginForm): không phụ thuộc kiểm tra origin của
// Better Auth, nên chạy được trên mọi domain (localhost, preview, domain riêng).
// Plugin nextCookies trong lib/auth.ts xoá cookie phiên trong Server Action.
export async function logoutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/admin");
}
