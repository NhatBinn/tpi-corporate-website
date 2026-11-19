import { getProjectsByCategory } from "@/services/project.service";
import ProjectGrid from "./ProjectGrid";
import ProjectLink from "./ProjectLink";
import { notFound } from "next/navigation";

async function ProjectListSection({ cats }: { cats: string }) {
  const category = cats === "all" ? "" : cats;
  const res = await getProjectsByCategory(category);
  if (!res.success) return notFound();

  return (
    <section className="my-14">
      <div className="flex flex-col justify-center items-center">
        <ProjectLink active={cats} />
        {res.data.length > 0 ? (
          <ProjectGrid projectList={res.data} />
        ) : (
          <p className="py-16 text-[15px] text-[#9a9a9a]">Chưa có dự án nào trong danh mục này.</p>
        )}
      </div>
    </section>
  );
}

export default ProjectListSection;
