import Link from "next/link";
import { cn } from "@/lib/utils";
import { getProjectsCategories } from "@/services/project.service";

async function ProjectLink({ active }: { active: string }) {
  const res = await getProjectsCategories();
  if (!res.success) return null;

  const tabs = [
    { slug: "all", name: "Tất cả", href: "/du-an" },
    ...res.data.map((cat) => ({ slug: cat.slug, name: cat.name, href: `/du-an?cats=${cat.slug}` })),
  ];

  return (
    // Mobile: 1 hàng cuộn ngang (21 danh mục sẽ chiếm 7 dòng nếu xuống hàng); từ md: xuống hàng, căn giữa.
    <nav
      aria-label="Lọc dự án theo danh mục"
      className="-mx-4 mb-8 flex gap-x-6 gap-y-3 overflow-x-auto whitespace-nowrap px-4 pb-1 md:mx-0 md:mb-10 md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal md:px-0"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.slug;
        return (
          <Link
            key={tab.slug}
            href={tab.href}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative inline-block shrink-0 pb-1.5 text-[13px] font-medium uppercase tracking-wide transition-colors md:text-[15px]",
              isActive ? "text-black" : "text-[#6b6b6b] hover:text-black",
            )}
          >
            {tab.name}
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand transition-transform duration-500",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export default ProjectLink;
