import Link from "next/link";
import RedStripes from "../common/RedStripes";
import ProjectsCarousel from "./ProjectsCarousel";
import { getFeaturedProjects } from "@/services/project.service";

// Carousel cần đủ card để lấp kín 5 cột trên PC mà không lặp lộ liễu.
const MIN_PROJECTS = 5;

export default async function ProjectsAndPartnersSection() {
  const res = await getFeaturedProjects(10);
  const projects = res.success ? res.data : [];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-site flex items-center justify-between py-8 md:py-10">
        <RedStripes className="hidden md:block h-30 w-75 lg:w-112.5" />

        <div className="md:text-right">
          <h2 className="text-[28px] md:text-[50px] leading-tight text-black">
            <span className="font-extrabold">Dự Án</span>
            <span className="font-normal"> và </span>
            <span className="font-extrabold">Đối Tác</span>
          </h2>
          <Link href="/du-an" className="mt-1 inline-block text-[13px] font-semibold text-brand hover:underline">
            Xem tất cả →
          </Link>
        </div>
      </div>

      {projects.length >= MIN_PROJECTS && <ProjectsCarousel projects={projects} />}
    </section>
  );
}
