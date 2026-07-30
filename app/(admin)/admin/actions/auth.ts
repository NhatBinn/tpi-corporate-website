"use server";

import { loginSchema } from "@/schemas/Login";
import { ChkLogin } from "@/services/user.service";
import { LoginActionState } from "@/types/common";

export async function ChkLoginForm(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await ChkLogin(formData);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Có lỗi xảy ra.",
    };
  }
}
