"use client";

import { signOut } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, FolderKanban, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/products", label: "Products", icon: Package },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderKanban },
];

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoutAction = async () => {
    await signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/admin");
        },
      },
    });
  };

  return (
    <nav className="flex h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-950">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-neutral-800 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500 text-sm font-bold text-white">
          A
        </div>
        <span className="text-sm font-semibold tracking-wide text-white">
          ADMIN BOARD
        </span>
      </div>

      {/* Nav links */}
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t border-neutral-800 p-3">
        <button
          onClick={handleLogoutAction}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} strokeWidth={2} />
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
