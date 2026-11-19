import { createAuthClient } from "better-auth/react";

// Chỉ còn dùng signUp cho nút tạo tài khoản ở bản dev (app/(admin)/admin/page.tsx).
// Đăng nhập / đăng xuất admin chạy qua Server Action (actions/admin/session.ts, app/(admin)/admin/actions/auth.ts).
export const { signUp } = createAuthClient();
