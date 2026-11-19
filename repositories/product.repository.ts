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

export async function findAllProducts() {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      category: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
