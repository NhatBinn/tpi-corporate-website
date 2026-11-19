import { prisma } from "@/lib/prisma";
import type { ProductCategoryInput, ProductInput, TagInput } from "@/schemas/admin";

// ------------------------------------------------------------
// DANH MỤC SẢN PHẨM
// ------------------------------------------------------------
export function findAdminProductCategories() {
  return prisma.productCategory.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      parentId: true,
      seoTitle: true,
      seoDescription: true,
      parent: { select: { name: true } },
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  });
}

export function createProductCategory(data: ProductCategoryInput) {
  return prisma.productCategory.create({ data });
}

export function updateProductCategory(id: string, data: ProductCategoryInput) {
  return prisma.productCategory.update({ where: { id }, data });
}

// onDelete Restrict: còn sản phẩm thì Prisma báo lỗi P2003 → service đổi thành thông báo.
export function deleteProductCategory(id: string) {
  return prisma.productCategory.delete({ where: { id } });
}

// ------------------------------------------------------------
// TAG
// ------------------------------------------------------------
export function findAdminTags() {
  return prisma.tag.findMany({
    select: { id: true, name: true, slug: true, _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
}

export function findTagOptions() {
  return prisma.tag.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
}

export function createTag(data: TagInput) {
  return prisma.tag.create({ data });
}

export function updateTag(id: string, data: TagInput) {
  return prisma.tag.update({ where: { id }, data });
}

// Bảng nối ẩn _ProductToTag được Prisma tự xoá theo.
export function deleteTag(id: string) {
  return prisma.tag.delete({ where: { id } });
}

// ------------------------------------------------------------
// SẢN PHẨM
// ------------------------------------------------------------
export function findAdminProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      sku: true,
      description: true,
      categoryId: true,
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      compressiveStrength: true,
      waterDilutionRatio: true,
      pack: true,
      imageUrl: true,
      pdfUrl: true,
      price: true,
      salePrice: true,
      stock: true,
      seoTitle: true,
      seoDescription: true,
      category: { select: { name: true } },
      tags: { select: { id: true } },
      productImages: { select: { url: true, alt: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { name: "asc" },
  });
}

export function findProductOptions() {
  return prisma.product.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
}

export function findProductCategoryOptions() {
  return prisma.productCategory.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
}

export function createProduct({ tagIds, images, ...data }: ProductInput) {
  return prisma.product.create({
    data: {
      ...data,
      tags: { connect: tagIds.map((id) => ({ id })) },
      productImages: { create: images },
    },
  });
}

// Tag và ảnh được thay toàn bộ theo form (set / deleteMany + create) trong cùng 1 lệnh update.
export function updateProduct(id: string, { tagIds, images, ...data }: ProductInput) {
  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      tags: { set: tagIds.map((tagId) => ({ id: tagId })) },
      productImages: { deleteMany: {}, create: images },
    },
  });
}

// ProjectProduct không cascade → xoá liên kết dự án trước. Ảnh, tag, liên kết giải pháp tự xoá theo.
export function deleteProduct(id: string) {
  return prisma.$transaction([
    prisma.projectProduct.deleteMany({ where: { productId: id } }),
    prisma.product.delete({ where: { id } }),
  ]);
}
