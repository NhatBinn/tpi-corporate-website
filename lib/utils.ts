import type { ProductStatus } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// "Bệnh Viện Nhi" → "benh-vien-nhi" (bỏ dấu tiếng Việt).
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const STATUS_MAP: Record<
  ProductStatus,
  { label: string; dot: string; text: string; bg: string }
> = {
  active: {
    label: "Đang bán",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  low_stock: {
    label: "Sắp hết",
    dot: "bg-amber-500",
    text: "text-amber-700",
    bg: "bg-amber-50",
  },
  out_of_stock: {
    label: "Hết hàng",
    dot: "bg-rose-500",
    text: "text-rose-700",
    bg: "bg-rose-50",
  },
};

export function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n) + "đ";
}
