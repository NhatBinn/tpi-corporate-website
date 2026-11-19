import { prisma } from "@/lib/prisma";

const postCardSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  thumbnailUrl: true,
  publishedAt: true,
  category: { select: { name: true, slug: true } },
} as const;

export async function findPostCategories() {
  return prisma.postCategory.findMany({
    where: { posts: { some: { isPublished: true } } },
    select: { id: true, name: true, slug: true, _count: { select: { posts: { where: { isPublished: true } } } } },
    orderBy: { sortOrder: "asc" },
  });
}

export async function findPosts({
  categorySlug,
  skip,
  take,
}: {
  categorySlug?: string;
  skip: number;
  take: number;
}) {
  const where = {
    isPublished: true,
    ...(categorySlug && { category: { slug: categorySlug } }),
  };
  const [items, total] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      select: postCardSelect,
      orderBy: { publishedAt: "desc" },
      skip,
      take,
    }),
    prisma.post.count({ where }),
  ]);
  return { items, total };
}

export async function findPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, isPublished: true },
    select: {
      ...postCardSelect,
      content: true,
      author: true,
      seoTitle: true,
      seoDescription: true,
      categoryId: true,
    },
  });
}

export async function findRecentPosts(take: number, excludeSlug?: string) {
  return prisma.post.findMany({
    where: { isPublished: true, ...(excludeSlug && { slug: { not: excludeSlug } }) },
    select: postCardSelect,
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function findRelatedPosts(categoryId: string, excludeSlug: string, take: number) {
  return prisma.post.findMany({
    where: { isPublished: true, categoryId, slug: { not: excludeSlug } },
    select: postCardSelect,
    orderBy: { publishedAt: "desc" },
    take,
  });
}
