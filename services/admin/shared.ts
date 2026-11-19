import { Prisma } from "@/prisma/generated/prisma/client";
import { slugify } from "@/lib/utils";
import { err, ok, type Result } from "@/types/result";

// Slug để trống → sinh từ tên ("Vữa tự san" → "vua-tu-san").
function withSlug<T extends { slug: string }>(data: T, name: string): Result<T> {
  const slug = data.slug || slugify(name);
  if (!slug) return err("Không tạo được slug từ tên, vui lòng nhập slug");
  return ok({ ...data, slug });
}

// Tạo mới khi id = null, ngược lại cập nhật.
export async function upsert<T extends { slug: string }>(
  label: string,
  id: string | null,
  data: T,
  name: string,
  create: (data: T) => Promise<unknown>,
  update: (id: string, data: T) => Promise<unknown>,
): Promise<Result<null>> {
  const resolved = withSlug(data, name);
  if (!resolved.success) return resolved;
  return runMutation(label, () => (id ? update(id, resolved.data) : create(resolved.data)));
}

// Với driver adapter (@prisma/adapter-pg), một số lỗi ràng buộc đến dưới dạng DriverAdapterError
// mang mã lỗi gốc của Postgres trong `cause` thay vì mã Prisma (P2002/P2003).
function postgresError(error: unknown): { code?: string; detail?: string } {
  const cause = (error as { cause?: { code?: unknown; originalCode?: unknown; detail?: unknown } })?.cause;
  const code = cause?.code ?? cause?.originalCode;
  return {
    code: typeof code === "string" ? code : undefined,
    detail: typeof cause?.detail === "string" ? cause.detail : undefined,
  };
}

// Đổi lỗi Prisma / Postgres thường gặp thành thông báo dễ hiểu cho người quản trị.
function prismaErrorMessage(error: unknown): string {
  const pg = postgresError(error);
  // 23001 restrict_violation, 23503 foreign_key_violation: còn bản ghi khác tham chiếu tới.
  if (pg.code === "23001" || pg.code === "23503") {
    return "Không thể xoá: vẫn còn dữ liệu khác đang dùng bản ghi này";
  }
  // 23505 unique_violation, detail dạng: Key (slug)=(abc) already exists.
  if (pg.code === "23505") {
    if (pg.detail?.includes("(slug)")) return "Slug đã tồn tại, vui lòng chọn slug khác";
    if (pg.detail?.includes("(sku)")) return "Mã sản phẩm (SKU) đã tồn tại";
    return "Dữ liệu bị trùng với một bản ghi khác";
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      // Qua driver adapter, meta.target có thể trống; tên cột nằm trong message: fields: (`slug`).
      const target = `${(error.meta?.target as string[] | string | undefined)?.toString() ?? ""} ${error.message}`;
      if (target.includes("slug")) return "Slug đã tồn tại, vui lòng chọn slug khác";
      if (target.includes("sku")) return "Mã sản phẩm (SKU) đã tồn tại";
      if (target.includes("email")) return "Email đã tồn tại";
      return "Dữ liệu bị trùng với một bản ghi khác";
    }
    if (error.code === "P2003" || error.code === "P2014") {
      return "Không thể xoá: vẫn còn dữ liệu khác đang dùng bản ghi này";
    }
    if (error.code === "P2025") return "Bản ghi không còn tồn tại (có thể đã bị xoá)";
  }
  return "Có lỗi xảy ra, vui lòng thử lại";
}

// Bọc mọi thao tác ghi của admin: log lỗi + trả về Result thay vì throw (đúng quy ước services/*).
export async function runMutation(label: string, fn: () => Promise<unknown>): Promise<Result<null>> {
  try {
    await fn();
    return ok(null);
  } catch (error) {
    console.log(`~${label}~`, error);
    return err(prismaErrorMessage(error));
  }
}

export async function runQuery<T>(label: string, fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return ok(await fn());
  } catch (error) {
    console.log(`~${label}~`, error);
    return err("Không tải được dữ liệu");
  }
}
