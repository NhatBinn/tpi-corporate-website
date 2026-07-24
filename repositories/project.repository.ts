import { prisma } from "@/lib/prisma";

export async function findProjectsByCategory(categoryId: string) {
  return prisma.project.findMany({
    ...(categoryId && {
      where: {
        categoryId,
      },
    }),
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      thumbnailUrl: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    take: 12,
  });
}

export async function findProjectsCategories() {
  return prisma.projectCategory.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    take: 4,
  });
}

export async function findProjectsBySlug(slug: string) {
  return prisma.project.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      location: true,
      investor: true,
      contractor: true,
      area: true,
      constructionTime: true,
      completedYear: true,
      thumbnailUrl: true,

      category: {
        select: {
          name: true,
        },
      },

      images: {
        select: {
          id: true,
          url: true,
          alt: true,
          sortOrder: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },

      projectProducts: {
        select: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
}
