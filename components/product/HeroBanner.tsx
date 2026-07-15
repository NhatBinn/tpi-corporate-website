import Image from "next/image";
import { ParallaxLogo } from "../common/ParallaxLogo";

function HeroBanner() {
  return (
    <section className="relative flex min-h-[300px] md:min-h-[500px] items-center overflow-hidden mt-">
      <Image
        src="/Cong-Truong-tong-hop-1398x606-BW.webp"
        alt="Công trường tổng hợp"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      <div className="relative z-10 mx-auto md:mr-auto w-full max-w-[960px] px-4 sm:px-6 md:pr-16 md:ml-20 mt-10">
        <h2 className="-mt-2 text-[28px] md:text-[40px] leading-tight text-white font-normal">
          <span>Giải pháp tháo khuôn</span>
          <br />
          <strong>NHÀ MÁY</strong>
          <span> đến </span>
          <strong>CÔNG TRÌNH</strong>
        </h2>

        <p className="mt-4 md:mt-5 text-[14px] md:text-[15px] leading-relaxed text-white/85">
          <span>
            – Tháo khuôn cốp pha nhôm, Gangform, cốp pha ván phủ film.
          </span>
          <br />
          <span>– Tháo khuôn cọc ly tâm dự ứng lực, trụ điện ly tâm.</span>
          <br />
          <span>– Tháo khuôn cốp pha dầm Super T,dầm hộp, cừ ván.</span>
          <br />
          <span>– Tháo khuôn ống cống ly tâm, ống cống rung ép.</span>
          <br />
          <span>
            – Tháo khuôn cấu kiện bê tông đúc sẵn, bê tông nghệ thuật, gạch bê
            tông...
          </span>
          <br />
        </p>
      </div>

      <ParallaxLogo position={true} />
    </section>
  );
}

export default HeroBanner;
