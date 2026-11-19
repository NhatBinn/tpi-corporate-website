import { prisma } from "@/lib/prisma";
import type { PostCategoryInput, PostInput } from "@/schemas/admin";

// ------------------------------------------------------------
// CHUYÊN MỤC
// ------------------------------------------------------------
export function findAdminPostCategories() {
  return prisma.postCategory.findMany({
    select: { id: true, name: true, slug: true, sortOrder: true, _count: { select: { posts: true } } },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export function findPostCategoryOptions() {
  return prisma.postCategory.findMany({
    select: { id: true, name: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export function createPostCategory(data: PostCategoryInput) {
  return prisma.postCategory.create({ data });
}

export function updatePostCategory(id: string, data: PostCategoryInput) {
  return prisma.postCategory.update({ where: { id }, data });
}

export function deletePostCategory(id: string) {
  return prisma.postCategory.delete({ where: { id } });
}

// ------------------------------------------------------------
// BÀI VIẾT
// ------------------------------------------------------------
export function findAdminPosts() {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      thumbnailUrl: true,
      author: true,
      isPublished: true,
      publishedAt: true,
      seoTitle: true,
      seoDescription: true,
      categoryId: true,
      category: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
  });
}

export function createPost(data: PostInput) {
  return prisma.post.create({ data });
}

export function updatePost(id: string, data: PostInput) {
  return prisma.post.update({ where: { id }, data });
}

export function deletePost(id: string) {
  return prisma.post.delete({ where: { id } });
}
