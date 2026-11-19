"use client";

import Link from "next/link";
import useInfiniteList from "@/hooks/useInfiniteList";
import RedStripes from "../common/RedStripes";
import ProjectCard from "../project/ProjectCard";

const projects = [
  { image: "/TPI-Victoria-Village-Novaland-phoi-canh-500x500.webp", name: "Victoria Village" },
  { image: "/TPI-AT-Sky-Garden-phoi-canh-4-500x500.webp", name: "A&T Sky Garden" },
  { image: "/TPI-Elysian-Q9-phoi-canh-500x500.webp", name: "Elysian" },
  { image: "/TPI-Thuan-An-1-phoi-canh-500x500.webp", name: "Khu Phức Hợp Thuận An 1" },
  { image: "/TPI-Lumi-Hanoi-phoi-canh-1-500x500.webp", name: "Lumi Hanoi" },
  { image: "/TPI-Picity-Sky-Park-phoi-canh-1-500x500.webp", name: "Picity Sky Park" },
  { image: "/Sycamore-–-Orchard-Heights-5-500x500.webp", name: "Sycamore – Orchard Heights" },
];

function ProjectsCarousel() {
  const { setIsPaused, handleTransitionEnd, tripled, trackStyle, firstCardRef } = useInfiniteList(
    projects,
    { gap: 0, intervalMs: 2500 },
  );

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
              href="/du-an"
              image={project.image}
              name={project.name}
              category="Cao tầng"
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

export default function ProjectsAndPartnersSection() {
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
          <Link
            href="/du-an"
            className="mt-1 inline-block text-[13px] font-semibold text-[#0a8a3f] hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>
      </div>

      <ProjectsCarousel />
    </section>
  );
}
