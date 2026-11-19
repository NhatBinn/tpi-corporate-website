import type { ProjectList } from "@/types/common";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ projectList }: { projectList: ProjectList[] }) {
  return (
    <div className="grid w-full grid-cols-2 lg:grid-cols-3">
      {projectList.map((project) => (
        <ProjectCard
          key={project.id}
          href={`/du-an/${project.slug}`}
          image={project.thumbnailUrl}
          name={project.name}
          category={project.category.name}
          sizes="(max-width: 1024px) 50vw, 400px"
          className="aspect-[16/10]"
        />
      ))}
    </div>
  );
}

export default ProjectGrid;
