import Image from "next/image";
import Link from "next/link";

function ProjectHeroBanner({ name, slug }: { name: string; slug: string }) {
  return (
    <section className="relative flex min-h-50 md:min-h-80 items-center overflow-hidden mt-">
      <Image
        src="/Vua-tu-san.webp"
        alt="Công trường tổng hợp"
        fill
        priority
        className="object-cover object-bottom brightness-125"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/15 to-black/10" />

      <div className="relative z-10 md:mr-auto px-4 sm:px-6 md:pr-16 md:ml-84 mt-26 mx-auto w-full max-w-350">
        <h1 className="-mt-2 text-[40px] md:text-[68px] leading-tight text-white font-medium">
          {name}
        </h1>
        <div className="text-[14px] mt-2 text-white">
          <Link href={"/"}>Home</Link>
          <span> / </span>
          <Link href={`du-an/${slug}`}>{name}</Link>
          <span> / </span>
          <span>{name}</span>
        </div>
      </div>
    </section>
  );
}

export default ProjectHeroBanner;
