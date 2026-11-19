import { headers } from "next/headers";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;

function isAdmin(session: Session | null): session is Session {
  return session?.user.role === "admin";
}

// Dùng trong Server Action / Route Handler: chỉ tài khoản role = "admin" mới được ghi dữ liệu.
export async function getAdminSession() {
  const session = await getSession();
  return isAdmin(session) ? session : null;
}
