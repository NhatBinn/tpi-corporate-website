import { prisma } from "@/lib/prisma";

// Better Auth lưu email dạng chữ thường.
export async function findUserRoleByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
    select: { role: true },
  });
}
