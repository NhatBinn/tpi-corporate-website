import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="min-h-dvh flex flex-row p-2 my-2">
        <div className="flex-1/7">
          <Sidebar />
        </div>

        <div className="flex-6/7">{children}</div>
      </section>
    </>
  );
}
