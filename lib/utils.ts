import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Bỏ dấu tiếng Việt + chữ thường, dùng để tìm kiếm: "Vữa Tự San" → "vua tu san".
// "đ" không tách dấu được bằng NFD nên phải đổi tay.
export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

// "Bệnh Viện Nhi Đồng" → "benh-vien-nhi-dong" (dùng cho slug URL, cả trong prisma/seed.ts).
export function slugify(text: string) {
  return normalizeText(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// 2026-11-20 → "20/11/2026"
export function formatDateVN(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}
