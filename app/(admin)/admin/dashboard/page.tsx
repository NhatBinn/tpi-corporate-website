import Link from "next/link";
import { Package, FolderKanban, Lightbulb, Newspaper, MessageSquare } from "lucide-react";
import { getSession } from "@/lib/session";
import { getDashboardStats } from "@/services/admin/dashboard.service";

export default async function DashboardPage() {
  const [session, res] = await Promise.all([getSession(), getDashboardStats()]);

  const stats = res.success
    ? [
        { label: "Sản phẩm", value: res.data.products, icon: Package, href: "/admin/dashboard/products" },
        { label: "Dự án", value: res.data.projects, icon: FolderKanban, href: "/admin/dashboard/projects" },
        { label: "Giải pháp", value: res.data.solutions, icon: Lightbulb, href: "/admin/dashboard/solutions" },
        { label: "Bài viết", value: res.data.posts, icon: Newspaper, href: "/admin/dashboard/posts" },
        { label: "Liên hệ", value: res.data.feedback, icon: MessageSquare, href: "/admin/dashboard/feedback" },
      ]
    : [];

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Chào mừng quay lại, {session?.user.name ?? session?.user.email}
        </p>
      </div>

      {!res.success && <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{res.error}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500">{label}</span>
              <Icon size={18} className="text-neutral-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-neutral-900">{value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 shadow-sm">
        <h2 className="text-base font-semibold text-neutral-900">Lưu ý khi cập nhật nội dung</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Mọi thay đổi được cập nhật ngay trên website (kể cả menu, trang chủ).</li>
          <li>Ảnh dùng đường dẫn trong thư mục public, ví dụ /Vua-tu-san.webp.</li>
          <li>Slug để trống sẽ tự tạo từ tên. Đổi slug sẽ làm thay đổi đường dẫn của trang.</li>
          <li>Danh mục / nhóm / chuyên mục còn dữ liệu bên trong thì không xoá được.</li>
        </ul>
      </div>
    </div>
  );
}
