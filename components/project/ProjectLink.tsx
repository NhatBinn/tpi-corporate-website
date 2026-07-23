import { cn } from "@/lib/utils";
import { getProjectsCategories } from "@/services/project.service";
import Link from "next/link";

async function ProjectLink({ active }: { active: string }) {
  const res = await getProjectsCategories();
  if (!res.success) return <h1>error get project categories</h1>;

  return (
    <div className="flex gap-5 text-[20px] my-6">
      <Link
        href={"/du-an"}
        className={cn(
          "group relative inline-block px-1 pb-2",
          active === "all"
            ? "text-[#333333]"
            : "text-[#333333B3] hover:text-[#333333]",
        )}
      >
        <span>All</span>
        <span
          className={cn(
            "absolute left-0 bottom-0 h-[2px] w-full bg-black origin-left transition-transform duration-500",
            active === "all"
              ? "scale-x-100"
              : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </Link>
      {res.data.map((cat) => (
        <Link
          key={cat.id}
          href={`/du-an?cats=${cat.slug}`}
          className={cn(
            "group relative inline-block px-1 pb-2",
            active === cat.slug
              ? "text-[#333333]"
              : "text-[#333333B3] hover:text-[#333333]",
          )}
        >
          <span>{cat.name}</span>
          <span
            className={cn(
              "absolute left-0 bottom-0 h-[2px] w-full bg-black origin-left transition-transform duration-500",
              active === cat.slug
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100",
            )}
          />
        </Link>
      ))}
    </div>
  );
}

export default ProjectLink;
