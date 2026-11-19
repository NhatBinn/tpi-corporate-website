import { auth } from "@/lib/auth";
import type { LoginInput } from "@/schemas/Login";
import { findUserRoleByEmail } from "@/repositories/user.repository";
import { err, ok } from "@/types/result";

const INVALID_LOGIN = "Email hoặc mật khẩu không đúng";

export async function ChkLogin({ email, password }: LoginInput) {
  try {
    // Chỉ tài khoản admin mới được vào /admin. Cùng một thông báo lỗi với sai mật khẩu
    // để không lộ email nào tồn tại trong hệ thống.
    const user = await findUserRoleByEmail(email);
    if (user?.role !== "admin") return err(INVALID_LOGIN);

    const data = await auth.api.signInEmail({ body: { email, password } });
    return ok(data);
  } catch (error) {
    console.log("~ChkLogin~", error);
    return err(INVALID_LOGIN);
  }
}
