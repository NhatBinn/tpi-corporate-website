"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { slugify } from "@/lib/utils";
import type { Product, ProductStatus } from "@/types/product";

type ProductPayload = {
  name: string;
  category: string;
  price: number;
  stock: number;
};

type MutationResult =
  | { success: true; data: Product }
  | { success: false; error: string };

const UNAUTHORIZED = { success: false, error: "Bạn cần đăng nhập để thực hiện thao tác này" } as const;

// Server Action là endpoint POST công khai → phải tự kiểm tra, không tin dữ liệu từ client.
function validatePayload(p: ProductPayload): string | null {
  if (!p.name?.trim() || !p.category?.trim()) return "Vui lòng nhập tên và danh mục";
  if (!Number.isFinite(p.price) || p.price < 0) return "Giá không hợp lệ";
  if (!Number.isInteger(p.stock) || p.stock < 0) return "Tồn kho phải là số nguyên không âm";
  return null;
}

function deriveStatus(stock: number): ProductStatus {
  if (stock === 0) return "out_of_stock";
  if (stock < 10) return "low_stock";
  return "active";
}

function toSlug(name: string): string {
  return `${slugify(name)}-${Date.now()}`;
}

function mapProduct(p: {
  id: string;
  name: string;
  price: { toNumber: () => number } | null;
  stock: number | null;
  category: { name: string };
}): Product {
  return {
    id: p.id,
    name: p.name,
    category: p.category.name,
    price: p.price ? p.price.toNumber() : 0,
    stock: p.stock ?? 0,
    status: deriveStatus(p.stock ?? 0),
  };
}

const productSelect = {
  id: true,
  name: true,
  price: true,
  stock: true,
  category: { select: { name: true } },
} as const;

export async function createProduct(
  payload: ProductPayload
): Promise<MutationResult> {
  if (!(await getSession())) return UNAUTHORIZED;
  const invalid = validatePayload(payload);
  if (invalid) return { success: false, error: invalid };

  try {
    const category = await prisma.productCategory.findFirst({
      where: { name: { equals: payload.category.trim(), mode: "insensitive" } },
      select: { id: true },
    });
    if (!category) {
      return { success: false, error: "Danh mục không tồn tại trong hệ thống" };
    }

    const slug = toSlug(payload.name);
    const product = await prisma.product.create({
      data: {
        name: payload.name,
        slug,
        price: payload.price,
        stock: payload.stock,
        categoryId: category.id,
      },
      select: productSelect,
    });

    return { success: true, data: mapProduct(product) };
  } catch (error) {
    console.log("~createProduct~", error);
    return { success: false, error: "Không thể tạo sản phẩm" };
  }
}

export async function updateProduct(
  id: string,
  payload: ProductPayload
): Promise<MutationResult> {
  if (!(await getSession())) return UNAUTHORIZED;
  const invalid = validatePayload(payload);
  if (invalid) return { success: false, error: invalid };

  try {
    const category = await prisma.productCategory.findFirst({
      where: { name: { equals: payload.category.trim(), mode: "insensitive" } },
      select: { id: true },
    });
    if (!category) {
      return { success: false, error: "Danh mục không tồn tại trong hệ thống" };
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        categoryId: category.id,
      },
      select: productSelect,
    });

    return { success: true, data: mapProduct(product) };
  } catch (error) {
    console.log("~updateProduct~", error);
    return { success: false, error: "Không thể cập nhật sản phẩm" };
  }
}

export async function deleteProduct(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  if (!(await getSession())) return UNAUTHORIZED;

  try {
    await prisma.$transaction([
      prisma.projectProduct.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } }),
    ]);
    return { success: true };
  } catch (error) {
    console.log("~deleteProduct~", error);
    return { success: false, error: "Không thể xoá sản phẩm" };
  }
}
