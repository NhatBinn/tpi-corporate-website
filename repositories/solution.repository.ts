import { prisma } from "@/lib/prisma";

export async function findSolutionsByCategory() {
  return await prisma.solution.findMany({
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
