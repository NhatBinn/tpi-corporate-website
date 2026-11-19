// Chỉ dùng phía server (import từ file "use server" trong actions/admin/*).
import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { getAdminSession } from "@/lib/session";
import type { AdminActionResult } from "@/types/admin";
import type { Result } from "@/types/result";

const UNAUTHORIZED: AdminActionResult = {
  success: false,
  error: "Bạn cần đăng nhập bằng tài khoản admin để thực hiện thao tác này",
};

// Header (mega menu), trang chủ, /giai-phap... được render tĩnh lúc build → làm mới toàn bộ
// layout sau mỗi thay đổi, nếu không web chỉ cập nhật ở lần deploy sau.
function revalidateSite() {
  revalidatePath("/", "layout");
}

// Server Action là endpoint POST công khai: luôn kiểm tra quyền và validate lại trên server,
// không tin dữ liệu từ client.
export async function adminSave<S extends z.ZodType>(
  schema: S,
  input: unknown,
  run: (data: z.output<S>) => Promise<Result<unknown>>,
): Promise<AdminActionResult> {
  if (!(await getAdminSession())) return UNAUTHORIZED;

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng kiểm tra lại các trường được đánh dấu",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>,
    };
  }

  const res = await run(parsed.data);
  if (!res.success) return { success: false, error: res.error };

  revalidateSite();
  return { success: true };
}

export async function adminDelete(id: unknown, run: (id: string) => Promise<Result<unknown>>): Promise<AdminActionResult> {
  if (!(await getAdminSession())) return UNAUTHORIZED;
  if (typeof id !== "string" || !id) return { success: false, error: "Thiếu id bản ghi" };

  const res = await run(id);
  if (!res.success) return { success: false, error: res.error };

  revalidateSite();
  return { success: true };
}
