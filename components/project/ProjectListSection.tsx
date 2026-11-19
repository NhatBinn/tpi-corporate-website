import { getProjectsByCategory } from "@/services/project.service";
import ProjectGrid from "./ProjectGrid";
import ProjectLink from "./ProjectLink";
import { notFound } from "next/navigation";

async function ProjectListSection({ cats }: { cats: string }) {
  const category = cats === "all" ? "" : cats;
  const res = await getProjectsByCategory(category);
  if (!res.success) return notFound();

  return (
    <section className="container-site py-12 md:py-14">
      <ProjectLink active={cats} />
      {res.data.length > 0 ? (
        <ProjectGrid projectList={res.data} />
      ) : (
        <p className="py-16 text-center text-[15px] text-[#9a9a9a]">Chưa có dự án nào trong danh mục này.</p>
      )}
    </section>
  );
}

export default ProjectListSection;
