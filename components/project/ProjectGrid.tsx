import { ProjectList } from "@/types/common";
import Image from "next/image";
import Link from "next/link";

function ProjectGrid({ projectList }: { projectList: ProjectList[] }) {
  return (
    <div className="grid grid-cols-4 gap-0 w-full">
      {projectList.map((project, i) => (
        <div
          key={i}
          className="relative h-[200px] sm:h-[300px] md:h-[420px] shrink-0 overflow-hidden"
        >
          <Link
            href={`/du-an/${project.slug}`}
            className="group block h-full w-full"
          >
            <Image
              src={project.thumbnailUrl}
              alt={
                project.description ??
                "TPI cung cấp giải pháp chống thấm và vữa chuyên dụng."
              }
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/55" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h3 className="mt-3 text-xs md:text-[16px] font-semibold opacity-0 translate-y-8 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100 text-[#ccc]">
                {project.category.name}
              </h3>

              <span className="text-xl md:text-2xl font-medium opacity-0 -translate-y-8 transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-100 text-white">
                {project.name}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProjectGrid;
