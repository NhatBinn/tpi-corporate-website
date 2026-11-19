import { prisma } from "@/lib/prisma";

export async function findSolutionBySlug(slug: string) {
  return prisma.solution.findFirst({
    where: { slug, isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      content: true,
      imageUrl: true,
      category: { select: { name: true } },
      solutionProducts: {
        select: {
          product: {
            select: { id: true, name: true, slug: true, imageUrl: true, description: true },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function findSolutionsByCategory() {
  return await prisma.solution.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
      description: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}
