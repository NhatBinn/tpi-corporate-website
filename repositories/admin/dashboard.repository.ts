import { prisma } from "@/lib/prisma";

export async function countDashboardStats() {
  const [products, projects, solutions, posts, feedback] = await prisma.$transaction([
    prisma.product.count(),
    prisma.project.count(),
    prisma.solution.count(),
    prisma.post.count(),
    prisma.feedback.count(),
  ]);
  return { products, projects, solutions, posts, feedback };
}

// Bảng contact chưa có cột thời gian → không sắp xếp theo ngày gửi được.
export function findAdminFeedback() {
  return prisma.feedback.findMany({
    select: { id: true, name: true, email: true, phone: true, company: true, message: true },
  });
}

export function deleteFeedback(id: string) {
  return prisma.feedback.delete({ where: { id } });
}
