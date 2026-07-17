import Image from "next/image";
import { ParallaxLogo } from "../common/ParallaxLogo";
import Link from "next/link";

function HeroBanner() {
  return (
    <section className="relative flex min-h-[200px] md:min-h-[300px] items-center overflow-hidden mt-">
      <Image
        src="/Vua-tu-san.webp"
        alt="Công trường tổng hợp"
        fill
        priority
        className="object-cover object-bottom brightness-125"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/15 to-black/10" />

      <div className="relative z-10 mx-auto md:mr-auto w-full max-w-[960px] px-4 sm:px-6 md:pr-16 md:ml-84 mt-10">
        <h1 className="-mt-2 text-[40px] md:text-[72px] leading-tight text-white font-bold">
          Liên hệ
        </h1>
        <div>
          <Link href={"/"}>Home</Link>
          <span> / </span>
          <span>Liên hệ</span>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
