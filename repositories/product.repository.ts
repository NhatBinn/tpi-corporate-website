import { prisma } from "@/lib/prisma";

export async function findProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      sku: true,
      description: true,
      imageUrl: true,
      pdfUrl: true,
      compressiveStrength: true,
      waterDilutionRatio: true,
      pack: true,
      price: true,
      salePrice: true,
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      seoTitle: true,
      seoDescription: true,
      category: { select: { id: true, name: true, slug: true } },
      tags: { select: { id: true, name: true, slug: true } },
      productImages: {
        select: { id: true, url: true, alt: true, sortOrder: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function findRelatedProducts(categoryId: string, excludeSlug: string) {
  return prisma.product.findMany({
    where: { categoryId, slug: { not: excludeSlug } },
    select: { id: true, name: true, slug: true, imageUrl: true, description: true },
    take: 8,
  });
}

export async function findSearchableProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      sku: true,
      imageUrl: true,
      description: true,
      category: { select: { name: true } },
    },
    orderBy: { name: "asc" },
  });
}

export async function findProductsByCategory(categoryId: string) {
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

const productCardSelect = {
  id: true,
  name: true,
  slug: true,
  imageUrl: true,
  description: true,
} as const;

// Chỉ lấy danh mục có sản phẩm: danh mục rỗng hiện thành tab trống.
export async function findCategoriesWithProducts() {
  return await prisma.productCategory.findMany({
    where: { products: { some: {} } },
    select: {
      id: true,
      name: true,
      slug: true,
      products: { select: productCardSelect, orderBy: { name: "asc" } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function findHighlightedProducts() {
  return await prisma.product.findMany({
    where: { OR: [{ isFeatured: true }, { isNew: true }] },
    select: { ...productCardSelect, isFeatured: true, isNew: true },
    orderBy: { name: "asc" },
  });
}
