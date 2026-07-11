"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    src: "/TPI-Victoria-Village-Novaland-phoi-canh-500x500.webp",
    alt: "Dự án căn hộ 1",
    link: '/project/1'
  },
  {
    src: "/TPI-AT-Sky-Garden-phoi-canh-4-500x500.webp",
    alt: "Dự án khu dân cư 2",
    link: '/project/3'
  },
  { src: "/TPI-Elysian-Q9-phoi-canh-500x500.webp", alt: "Dự án khu dân cư 3", link: '/project/2'},
  {
    src: "/TPI-Thuan-An-1-phoi-canh-500x500.webp",
    alt: "Dự án chung cư có hồ bơi",
    link: '/project/4'
  },
  { src: "/TPI-Lumi-Hanoi-phoi-canh-1-500x500.webp", alt: "Lotus Tower", link: '/project/7'},
  {
    src: "/TPI-Picity-Sky-Park-phoi-canh-1-500x500.webp",
    alt: "Dự án cao ốc ven sông",
    link: '/project/5'
  },
  {
    src: "/Sycamore-–-Orchard-Heights-5-500x500.webp",
    alt: "Dự án cao ốc ven sông 2",
    link: '/project/6'
  },
];

const VISIBLE_COUNT = 5;
const INTERVAL_MS = 2000;

function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const extendedProjects = [...projects, ...projects.slice(0, VISIBLE_COUNT)];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPaused]);

  function handleTransitionEnd() {
    if (index !== projects.length) return;

    setWithTransition(false);
    setIndex(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setWithTransition(true));
    });
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex ${
          withTransition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * (100 / VISIBLE_COUNT)}%)`,
        }}
      >
        {extendedProjects.map((project, i) => (
          <div
            key={i}
            className="relative h-[200px] sm:h-[300px] md:h-[420px] shrink-0 overflow-hidden"
            style={{ width: `${100 / VISIBLE_COUNT}%` }}
          >
            <Link href={project.link} className="group block h-full w-full">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/55" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h3 className="mt-3 text-xl md:text-3xl font-semibold opacity-0 translate-y-8 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                  Cao tầng
                </h3>

                <span className="text-xs md:text-sm font-medium opacity-0 -translate-y-8 transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-100">
                  Khu Phức Hợp Thuận An 1
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsAndPartnersSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 md:px-6 py-8 md:py-10">
        <svg viewBox="0 0 380 150" className="hidden md:block h-[80px] md:h-[120px] w-[300px] md:w-[450px]">
          <polygon points="0,150 95,150 235,0 140,0" fill="#e5173f" />
          <polygon points="145,150 240,150 380,0 285,0" fill="#e5173f" />
        </svg>

        <div className="text-right md:mr-10">
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
