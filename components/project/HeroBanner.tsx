import Image from "next/image";
import Link from "next/link";

function HeroBanner() {
  return (
    <section className="relative flex min-h-50 md:min-h-75 items-center overflow-hidden mt-">
      <Image
        src="/Vua-tu-san.webp"
        alt="Công trường tổng hợp"
        fill
        priority
        className="object-cover object-bottom brightness-125"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/15 to-black/10" />

      <div className="relative z-10 md:mr-auto px-4 sm:px-6 md:pr-16 md:ml-84 mt-10 mx-auto w-full max-w-350">
        <h1 className="-mt-2 text-[40px] md:text-[72px] leading-tight text-white font-bold">
          Victoria Village
        </h1>
        <div>
          <Link href={"/"}>Home</Link>
          <span> / </span>
          <span>Project</span>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
