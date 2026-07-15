"use client";

import Image from "next/image";
import Link from "next/link";
import { ParallaxLogo } from "../common/ParallaxLogo";

export default function QualityControlSection() {
  return (
    <section className="relative flex min-h-[400px] md:min-h-[1000px] items-center overflow-hidden">
      <Image
        src="/San-xuat-grayscale.jpg"
        alt="Nhà máy TPI tại Lái Thiêu, Bình Dương"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      <ParallaxLogo />

      <div className="relative z-10 mx-auto md:ml-auto w-full max-w-[960px] px-4 sm:px-6 md:pr-16 md:mr-20">
        <div className="flex items-baseline gap-3">
          <span
            className="text-[40px] md:text-[64px] font-black leading-none text-[#0a8a3f]/30"
            style={{ textShadow: "0 0 24px rgba(10,138,63,0.5)" }}
          >
            02
          </span>
          <p className="-ml-2 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.15em] text-white/80">
            Chủ Động Sản Xuất
          </p>
        </div>

        <h2 className="-mt-2 text-[28px] md:text-[40px] leading-tight text-white">
          <span className="font-light">Kiểm soát </span>
          <span className="font-extrabold">CHẤT LƯỢNG</span>
        </h2>

        <p className="mt-4 md:mt-5 text-[14px] md:text-[15px] leading-relaxed text-white/85">
          TPI sở hữu nhà máy diện tích 1,500m² tại khu vực Lái Thiêu, Bình
          Dương. Máy móc, trang thiết bị liên tục được đầu tư để đáp ứng sản
          xuất và kiểm soát chất lượng.
        </p>

        <p className="mt-3 md:mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/85">
          Chúng tôi cũng thường xuyên tổ chức các buổi tham quan nhà máy cho quý
          khách hàng, đối tác, nhà cung cấp...
        </p>

        <div className="mt-6 md:mt-7 flex items-center gap-4">
          <Link
            href="/gioi-thieu"
            className="rounded-full bg-[#0a8a3f] px-6 py-2.5 md:px-7 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#097535]"
          >
            About Us
          </Link>
          <Link
            href="/du-an"
            className="rounded-full bg-white px-6 py-2.5 md:px-7 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-white/90"
          >
            View More
          </Link>
        </div>

        <div className="mt-6 md:mt-8 inline-flex items-center px-3 md:px-5 py-3">
          <Image
            src="/AQS-VGBC.webp"
            alt="Chứng nhận ISO 9001:2015 - IQS Global và Vietnam Green Building Council"
            width={200}
            height={120}
            className="object-contain w-[160px] md:w-[260px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
