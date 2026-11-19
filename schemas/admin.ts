import * as z from "zod";

// ============================================================
// Schema cho form admin. Giá trị từ form: text/number/date/select → string,
// checkbox → boolean, multiselect → string[]. Schema ép kiểu về dạng Prisma cần.
// ============================================================

const req = (label: string, max = 200) =>
  z.string().trim().min(1, `Vui lòng nhập ${label}`).max(max, `${label} tối đa ${max} ký tự`);

const opt = (max = 255) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .transform((v) => v || null);

// Để trống → service tự sinh từ tên.
const slug = z
  .string()
  .trim()
  .toLowerCase()
  .max(200, "Slug tối đa 200 ký tự")
  .regex(/^([a-z0-9]+(-[a-z0-9]+)*)?$/, "Slug chỉ gồm chữ thường không dấu, số và dấu - (vd: vua-tu-san)");

const pick = (label: string) => z.string().min(1, `Vui lòng chọn ${label}`);
const optId = z.string().transform((v) => v || null);
const ids = z.array(z.string().min(1)).max(500);
const bool = z.boolean();

function intField(label: string, min: number, max: number) {
  return z
    .string()
    .trim()
    .transform((v, ctx) => {
      if (!v) return null;
      const n = Number(v);
      if (!Number.isInteger(n) || n < min || n > max) {
        ctx.addIssue({ code: "custom", message: `${label} phải là số nguyên từ ${min} đến ${max}` });
        return z.NEVER;
      }
      return n;
    });
}

const sortOrder = intField("Thứ tự", 0, 100000).transform((v) => v ?? 0);

const money = z
  .string()
  .trim()
  .transform((v, ctx) => {
    if (!v) return null;
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0 || n > 1e12) {
      ctx.addIssue({ code: "custom", message: "Giá không hợp lệ" });
      return z.NEVER;
    }
    return n;
  });

// next/image chỉ cho phép ảnh nội bộ (thư mục public) vì chưa cấu hình images.remotePatterns.
const IMAGE_HINT = "Ảnh phải là đường dẫn trong thư mục public, bắt đầu bằng / (vd: /Vua-tu-san.webp)";
const optImage = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/"), IMAGE_HINT)
  .transform((v) => v || null);
const reqImage = z.string().trim().min(1, "Vui lòng nhập ảnh đại diện").max(500).refine((v) => v.startsWith("/"), IMAGE_HINT);

const optLink = z
  .string()
  .trim()
  .max(1000)
  .refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//.test(v), "Link phải bắt đầu bằng / hoặc https://")
  .transform((v) => v || null);

const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày không hợp lệ")
  .transform((d) => new Date(`${d}T08:00:00+07:00`));

// Danh sách ảnh: mỗi dòng "đường-dẫn | mô tả (alt)".
export const IMAGE_LINES_HELP = "Mỗi dòng một ảnh, dạng: /duong-dan-anh.webp | mô tả ảnh";
const imageLines = z
  .string()
  .max(10000)
  .transform((v, ctx) => {
    const lines = v
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    const images = lines.map((line, i) => {
      const [url, ...altParts] = line.split("|");
      return { url: url.trim(), alt: altParts.join("|").trim() || null, sortOrder: i + 1 };
    });
    const bad = images.find((img) => !img.url.startsWith("/"));
    if (bad) {
      ctx.addIssue({ code: "custom", message: `Ảnh "${bad.url}" không hợp lệ. ${IMAGE_HINT}` });
      return z.NEVER;
    }
    if (images.length > 30) {
      ctx.addIssue({ code: "custom", message: "Tối đa 30 ảnh" });
      return z.NEVER;
    }
    return images;
  });

const seo = {
  seoTitle: opt(200),
  seoDescription: opt(500),
};

// ------------------------------------------------------------
// SẢN PHẨM
// ------------------------------------------------------------
export const productCategorySchema = z.object({
  name: req("tên danh mục", 150),
  slug,
  parentId: optId,
  ...seo,
});

export const tagSchema = z.object({
  name: req("tên tag", 100),
  slug,
});

export const productSchema = z.object({
  name: req("tên sản phẩm", 200),
  slug,
  sku: opt(50),
  description: opt(5000),
  categoryId: pick("danh mục"),
  tagIds: ids,
  isFeatured: bool,
  isNew: bool,
  isBestSeller: bool,
  compressiveStrength: opt(100),
  waterDilutionRatio: opt(100),
  pack: opt(100),
  imageUrl: optImage,
  pdfUrl: optLink,
  price: money,
  salePrice: money,
  stock: intField("Tồn kho", 0, 1_000_000_000),
  images: imageLines,
  ...seo,
});

// ------------------------------------------------------------
// DỰ ÁN
// ------------------------------------------------------------
export const projectCategorySchema = z.object({
  name: req("tên danh mục", 150),
  slug,
  sortOrder,
});

export const projectSchema = z.object({
  name: req("tên dự án", 200),
  slug,
  excerpt: opt(500),
  description: opt(10000),
  thumbnailUrl: reqImage,
  location: opt(200),
  investor: opt(200),
  contractor: opt(200),
  area: opt(100),
  constructionTime: opt(100),
  completedYear: intField("Năm hoàn thành", 1900, 2100),
  isPublished: bool,
  isFeatured: bool,
  sortOrder,
  categoryId: pick("danh mục"),
  productIds: ids,
  images: imageLines,
  ...seo,
});

// ------------------------------------------------------------
// GIẢI PHÁP
// ------------------------------------------------------------
export const solutionCategorySchema = z.object({
  name: req("tên nhóm", 150),
  slug,
  sortOrder,
});

export const solutionSchema = z.object({
  name: req("tên giải pháp", 150),
  slug,
  description: opt(500),
  content: opt(20000),
  imageUrl: optImage,
  sortOrder,
  isPublished: bool,
  categoryId: pick("nhóm giải pháp"),
  productIds: ids,
});

// ------------------------------------------------------------
// BLOG
// ------------------------------------------------------------
export const postCategorySchema = z.object({
  name: req("tên chuyên mục", 150),
  slug,
  sortOrder,
});

export const postSchema = z.object({
  title: req("tiêu đề", 250),
  slug,
  excerpt: opt(500),
  content: req("nội dung", 50000),
  thumbnailUrl: reqImage,
  author: opt(100),
  isPublished: bool,
  publishedAt: date,
  categoryId: pick("chuyên mục"),
  ...seo,
});

export type ProductCategoryInput = z.output<typeof productCategorySchema>;
export type TagInput = z.output<typeof tagSchema>;
export type ProductInput = z.output<typeof productSchema>;
export type ProjectCategoryInput = z.output<typeof projectCategorySchema>;
export type ProjectInput = z.output<typeof projectSchema>;
export type SolutionCategoryInput = z.output<typeof solutionCategorySchema>;
export type SolutionInput = z.output<typeof solutionSchema>;
export type PostCategoryInput = z.output<typeof postCategorySchema>;
export type PostInput = z.output<typeof postSchema>;
