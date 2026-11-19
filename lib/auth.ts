import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { SITE_URL } from "./constants";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: process.env.BETTER_AUTH_URL,
  // Origin được gọi API Better Auth từ trình duyệt. Đăng nhập/đăng xuất admin chạy qua Server Action
  // nên không phụ thuộc danh sách này.
  trustedOrigins: [...new Set(["http://localhost:3000", "https://tpi-corporate-website.vercel.app", SITE_URL])],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    // /api/auth/sign-up/email là public → trên production ai cũng tự tạo được tài khoản vào /admin.
    disableSignUp: process.env.NODE_ENV === "production",
  },
  // Đưa cột User.role vào session để kiểm tra quyền admin.
  // input: false → client không tự gán được role khi đăng ký.
  user: {
    additionalFields: {
      role: { type: "string", input: false, defaultValue: "user" },
    },
  },
  plugins: [nextCookies()]
});
