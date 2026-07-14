import { prisma } from "@/lib/prisma";

export async function findCategoryByProduct() {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      products: {
        select: {
          id: true,
          name: true,
          slug: true,
          imageUrl: true,
          description: true,
        },
      },
    },
  });
}
