import type { FieldOption } from "@/types/admin";
import { normalizeText } from "@/lib/utils";

// Dựng dữ liệu cho components/admin/crud/CrudManager từ kết quả Prisma (chạy ở Server Component).

export const SLUG_HELP = "Để trống sẽ tự tạo từ tên. Chỉ gồm chữ thường không dấu, số và dấu -";
export const IMAGE_HELP = "Đường dẫn ảnh trong thư mục public, vd: /Vua-tu-san.webp";
export const RICH_TEXT_HELP =
  "Đoạn văn cách nhau 1 dòng trống · ## Tiêu đề · ### Tiêu đề nhỏ · - gạch đầu dòng · > trích dẫn · **chữ đậm**";

export function toOptions(list: { id: string; name: string }[]): FieldOption[] {
  return list.map((i) => ({ value: i.id, label: i.name }));
}

export function searchText(...parts: (string | null | undefined)[]) {
  return normalizeText(parts.filter(Boolean).join(" "));
}

// null/undefined → "" cho input; số, Decimal → chuỗi.
export function str(v: { toString(): string } | null | undefined) {
  return v === null || v === undefined ? "" : v.toString();
}

// Date → "YYYY-MM-DD" theo giờ Việt Nam cho <input type="date">.
export function toDateInput(d: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(d);
}

export function todayInput() {
  return toDateInput(new Date());
}

// Danh sách ảnh → textarea "url | alt" mỗi dòng (ngược với schemas/admin.ts imageLines).
export function imagesToLines(images: { url: string; alt: string | null }[]) {
  return images.map((img) => (img.alt ? `${img.url} | ${img.alt}` : img.url)).join("\n");
}
