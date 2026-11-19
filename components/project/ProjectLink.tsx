import Link from "next/link";
import { cn } from "@/lib/utils";
import { getProjectsCategories } from "@/services/project.service";

async function ProjectLink({ active }: { active: string }) {
  const res = await getProjectsCategories();
  if (!res.success) return null;

  const tabs = [
    { slug: "all", name: "All", href: "/du-an" },
    ...res.data.map((cat) => ({ slug: cat.slug, name: cat.name, href: `/du-an?cats=${cat.slug}` })),
  ];

  return (
    <div className="my-6 flex flex-wrap justify-center gap-5 px-4 text-[16px] md:text-[20px]">
      {tabs.map((tab) => {
        const isActive = active === tab.slug;
        return (
          <Link
            key={tab.slug}
            href={tab.href}
            className={cn(
              "group relative inline-block px-1 pb-2",
              isActive ? "text-[#333333]" : "text-[#333333B3] hover:text-[#333333]",
            )}
          >
            <span>{tab.name}</span>
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[2px] w-full origin-left bg-black transition-transform duration-500",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default ProjectLink;
