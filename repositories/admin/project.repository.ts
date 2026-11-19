import { prisma } from "@/lib/prisma";
import type { ProjectCategoryInput, ProjectInput } from "@/schemas/admin";

// ------------------------------------------------------------
// DANH MỤC DỰ ÁN
// ------------------------------------------------------------
export function findAdminProjectCategories() {
  return prisma.projectCategory.findMany({
    select: { id: true, name: true, slug: true, sortOrder: true, _count: { select: { projects: true } } },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export function findProjectCategoryOptions() {
  return prisma.projectCategory.findMany({
    select: { id: true, name: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export function createProjectCategory(data: ProjectCategoryInput) {
  return prisma.projectCategory.create({ data });
}

export function updateProjectCategory(id: string, data: ProjectCategoryInput) {
  return prisma.projectCategory.update({ where: { id }, data });
}

export function deleteProjectCategory(id: string) {
  return prisma.projectCategory.delete({ where: { id } });
}

// ------------------------------------------------------------
// DỰ ÁN
// ------------------------------------------------------------
export function findAdminProjects() {
  return prisma.project.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      excerpt: true,
      description: true,
      thumbnailUrl: true,
      location: true,
      investor: true,
      contractor: true,
      area: true,
      constructionTime: true,
      completedYear: true,
      isPublished: true,
      isFeatured: true,
      sortOrder: true,
      seoTitle: true,
      seoDescription: true,
      categoryId: true,
      category: { select: { name: true } },
      projectProducts: { select: { productId: true } },
      images: { select: { url: true, alt: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export function createProject({ productIds, images, ...data }: ProjectInput) {
  return prisma.project.create({
    data: {
      ...data,
      projectProducts: { create: productIds.map((productId) => ({ productId })) },
      images: { create: images },
    },
  });
}

export function updateProject(id: string, { productIds, images, ...data }: ProjectInput) {
  return prisma.project.update({
    where: { id },
    data: {
      ...data,
      projectProducts: { deleteMany: {}, create: productIds.map((productId) => ({ productId })) },
      images: { deleteMany: {}, create: images },
    },
  });
}

// ProjectProduct không cascade → xoá liên kết trước; ảnh dự án cascade theo.
export function deleteProject(id: string) {
  return prisma.$transaction([
    prisma.projectProduct.deleteMany({ where: { projectId: id } }),
    prisma.project.delete({ where: { id } }),
  ]);
}
