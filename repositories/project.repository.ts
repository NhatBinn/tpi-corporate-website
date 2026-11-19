import { prisma } from "@/lib/prisma";

// Lọc theo slug danh mục (giá trị của ?cats= trên URL), không phải id.
export async function findProjectsByCategory(categorySlug: string) {
  return prisma.project.findMany({
    where: {
      isPublished: true,
      ...(categorySlug && { category: { slug: categorySlug } }),
    },
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
    orderBy: { sortOrder: "asc" },
  });
}

// Carousel trang chủ: ưu tiên dự án nổi bật, sau đó theo thứ tự hiển thị.
export async function findFeaturedProjects(take: number) {
  return prisma.project.findMany({
    where: { isPublished: true },
    select: { id: true, name: true, slug: true, thumbnailUrl: true, category: { select: { name: true } } },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
    take,
  });
}

export async function findSearchableProjects() {
  return prisma.project.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      thumbnailUrl: true,
      location: true,
      investor: true,
      contractor: true,
      category: { select: { name: true } },
    },
    orderBy: { sortOrder: "asc" },
  });
}

// Chỉ danh mục có dự án đang công khai — tab rỗng không có ý nghĩa.
export async function findProjectsCategories() {
  return prisma.projectCategory.findMany({
    where: { projects: { some: { isPublished: true } } },
    select: { id: true, name: true, slug: true },
    orderBy: { sortOrder: "asc" },
  });
}

// Dự án đã ẩn (isPublished = false) không được xem qua URL trực tiếp.
export async function findProjectsBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      excerpt: true,
      location: true,
      investor: true,
      contractor: true,
      area: true,
      constructionTime: true,
      completedYear: true,
      thumbnailUrl: true,
      category: { select: { id: true, name: true } },
      images: {
        select: { id: true, url: true, alt: true, sortOrder: true },
        orderBy: { sortOrder: "asc" },
      },
      projectProducts: {
        select: {
          product: { select: { id: true, name: true, slug: true } },
        },
      },
    },
  });
}

export async function findRelatedProjects(categoryId: string, excludeSlug: string) {
  return prisma.project.findMany({
    where: { categoryId, slug: { not: excludeSlug }, isPublished: true },
    select: { id: true, name: true, slug: true, thumbnailUrl: true, category: { select: { name: true } } },
    take: 6,
    orderBy: { sortOrder: "asc" },
  });
}
