import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "https://tpi-corporate-website.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    // /api/auth/sign-up/email là public → trên production ai cũng tự tạo được tài khoản vào /admin.
    disableSignUp: process.env.NODE_ENV === "production",
  },
  plugins: [nextCookies()]
});
