"use client";

import useInfiniteList from "@/hooks/useInfiniteList";
import ProjectCard from "../project/ProjectCard";

export interface CarouselProject {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl: string;
  category: { name: string };
}

export default function ProjectsCarousel({ projects }: { projects: CarouselProject[] }) {
  const { setIsPaused, handleTransitionEnd, tripled, trackStyle, firstCardRef } = useInfiniteList(projects, {
    gap: 0,
    intervalMs: 2500,
  });

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div onTransitionEnd={handleTransitionEnd} style={trackStyle}>
        {tripled.map((project, i) => (
          <div key={i} ref={i === 0 ? firstCardRef : undefined} className="w-1/2 shrink-0 md:w-1/5">
            <ProjectCard
              href={`/du-an/${project.slug}`}
              image={project.thumbnailUrl}
              name={project.name}
              category={project.category.name}
              sizes="(max-width: 768px) 50vw, 20vw"
              eager
              className="h-[200px] sm:h-[300px] md:h-[420px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
