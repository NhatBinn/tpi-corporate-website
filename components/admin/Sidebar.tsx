"use client";

import { logoutAction } from "@/actions/admin/session";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  FolderKanban,
  Folders,
  Lightbulb,
  Layers,
  Newspaper,
  BookMarked,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: null,
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Sản phẩm",
    items: [
      { href: "/admin/dashboard/products", label: "Sản phẩm", icon: Package },
      { href: "/admin/dashboard/product-categories", label: "Danh mục sản phẩm", icon: FolderTree },
      { href: "/admin/dashboard/tags", label: "Tags", icon: Tags },
    ],
  },
  {
    label: "Dự án",
    items: [
      { href: "/admin/dashboard/projects", label: "Dự án", icon: FolderKanban },
      { href: "/admin/dashboard/project-categories", label: "Danh mục dự án", icon: Folders },
    ],
  },
  {
    label: "Giải pháp",
    items: [
      { href: "/admin/dashboard/solutions", label: "Giải pháp", icon: Lightbulb },
      { href: "/admin/dashboard/solution-categories", label: "Nhóm giải pháp", icon: Layers },
    ],
  },
  {
    label: "Blog",
    items: [
      { href: "/admin/dashboard/posts", label: "Bài viết", icon: Newspaper },
      { href: "/admin/dashboard/post-categories", label: "Chuyên mục", icon: BookMarked },
    ],
  },
  {
    label: "Khách hàng",
    items: [{ href: "/admin/dashboard/feedback", label: "Liên hệ", icon: MessageSquare }],
  },
];

// PC: sidebar dọc cố định bên trái. Mobile: thanh ngang trên cùng, các mục cuộn ngang.
function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 flex shrink-0 flex-col border-b border-neutral-800 bg-neutral-950 md:h-dvh md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-2 border-neutral-800 px-4 py-3 md:border-b md:px-6 md:py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500 text-sm font-bold text-white">
            A
          </div>
          <span className="text-sm font-semibold tracking-wide text-white">ADMIN BOARD</span>
        </div>
        <form action={logoutAction} className="md:hidden">
          <button
            type="submit"
            aria-label="Đăng xuất"
            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
          </button>
        </form>
      </div>

      <div className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:gap-0 md:overflow-y-auto md:py-3">
        {groups.map((group, gi) => (
          <div key={gi} className="flex shrink-0 gap-1 md:mb-3 md:flex-col md:gap-0.5">
            {group.label && (
              <p className="hidden px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 md:block">
                {group.label}
              </p>
            )}
            {group.items.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-white/10 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon size={17} strokeWidth={2} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <form action={logoutAction} className="hidden border-t border-neutral-800 p-3 md:block">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} strokeWidth={2} />
          Đăng xuất
        </button>
      </form>
    </nav>
  );
}

export default Sidebar;
