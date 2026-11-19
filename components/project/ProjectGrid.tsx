import type { ProjectList } from "@/types/common";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ projectList }: { projectList: ProjectList[] }) {
  return (
    <div className="grid w-full grid-cols-2 md:grid-cols-4">
      {projectList.map((project) => (
        <ProjectCard
          key={project.id}
          href={`/du-an/${project.slug}`}
          image={project.thumbnailUrl}
          name={project.name}
          category={project.category.name}
          className="h-[200px] sm:h-[300px] md:h-[420px]"
        />
      ))}
    </div>
  );
}

export default ProjectGrid;
