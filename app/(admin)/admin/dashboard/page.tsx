"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Package, FolderKanban, Users, Activity } from "lucide-react";

const stats = [
  { label: "Products", value: "—", icon: Package },
  { label: "Projects", value: "—", icon: FolderKanban },
  { label: "Users", value: "—", icon: Users },
  { label: "Activity", value: "—", icon: Activity },
];

function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/admin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center bg-neutral-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen flex-1 bg-neutral-50 px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Chào mừng quay lại, {session.user?.name ?? session.user?.email}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500">
                {label}
              </span>
              <Icon size={18} className="text-neutral-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-neutral-900">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Content placeholder */}
      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-neutral-900">
          Recent activity
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Chưa có dữ liệu để hiển thị.
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
