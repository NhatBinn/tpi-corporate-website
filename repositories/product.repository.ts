import { prisma } from "@/lib/prisma";

export async function findProductsByCategoryId(categoryId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
    },
  });
}

export async function findCategoriesWithProducts() {
  return await prisma.productCategory.findMany({
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
