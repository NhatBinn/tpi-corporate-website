import { prisma } from "@/lib/prisma";
import type { SolutionCategoryInput, SolutionInput } from "@/schemas/admin";

// ------------------------------------------------------------
// NHÓM GIẢI PHÁP
// ------------------------------------------------------------
export function findAdminSolutionCategories() {
  return prisma.solutionCategory.findMany({
    select: { id: true, name: true, slug: true, sortOrder: true, _count: { select: { solutions: true } } },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export function findSolutionCategoryOptions() {
  return prisma.solutionCategory.findMany({
    select: { id: true, name: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export function createSolutionCategory(data: SolutionCategoryInput) {
  return prisma.solutionCategory.create({ data });
}

export function updateSolutionCategory(id: string, data: SolutionCategoryInput) {
  return prisma.solutionCategory.update({ where: { id }, data });
}

export function deleteSolutionCategory(id: string) {
  return prisma.solutionCategory.delete({ where: { id } });
}

// ------------------------------------------------------------
// GIẢI PHÁP
// ------------------------------------------------------------
export function findAdminSolutions() {
  return prisma.solution.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      content: true,
      imageUrl: true,
      sortOrder: true,
      isPublished: true,
      categoryId: true,
      category: { select: { name: true } },
      solutionProducts: { select: { productId: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

// Thứ tự sản phẩm đề xuất = thứ tự trong danh sách chọn.
function productLinks(productIds: string[]) {
  return productIds.map((productId, i) => ({ productId, sortOrder: i + 1 }));
}

export function createSolution({ productIds, ...data }: SolutionInput) {
  return prisma.solution.create({
    data: { ...data, solutionProducts: { create: productLinks(productIds) } },
  });
}

export function updateSolution(id: string, { productIds, ...data }: SolutionInput) {
  return prisma.solution.update({
    where: { id },
    data: { ...data, solutionProducts: { deleteMany: {}, create: productLinks(productIds) } },
  });
}

// SolutionProduct cascade theo Solution.
export function deleteSolution(id: string) {
  return prisma.solution.delete({ where: { id } });
}
