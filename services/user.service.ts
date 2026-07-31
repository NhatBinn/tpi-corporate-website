import { auth } from "@/lib/auth";
import { loginSchema } from "@/schemas/Login";
import { err, ok } from "@/types/result";

export async function ChkLogin(formData: FormData) {
  const res = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!res.success) return err("Invalid data form");
  try {
    const data = await auth.api.signInEmail({
      body: {
        email: res.data.email,
        password: res.data.password,
      },
    });

    return ok(data);
  } catch (error) {
    console.log("~ChkLogin~", error);
    return err("Failed to login");
  }
}
