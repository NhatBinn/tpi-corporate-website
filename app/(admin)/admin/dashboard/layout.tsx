import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { getAdminSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // proxy.ts đã chặn trước; kiểm tra lại ở đây để trang admin không phụ thuộc duy nhất vào proxy.
  if (!(await getAdminSession())) redirect("/admin");

  return (
    <section className="flex min-h-dvh flex-col bg-neutral-50 md:flex-row">
      <Sidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}
