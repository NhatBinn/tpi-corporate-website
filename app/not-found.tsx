import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 sm:px-6 py-20">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        aria-hidden="true"
      >
        <filter id="concrete-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#concrete-grain)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">
          TPI — Tin Cậy · Nhiệt Huyết · Sáng Tạo
        </p>

        <div className="relative mt-6 h-[100px] w-[280px] sm:h-[130px] sm:w-[400px] md:h-[180px] md:w-[560px] max-w-full">
          <span className="absolute inset-0 flex select-none items-center justify-center text-[100px] sm:text-[140px] md:text-[180px] font-black leading-none tracking-tight text-[#1a1a1a]">
            404
          </span>

          <svg
            viewBox="0 0 560 200"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              className="tpi-crack-line"
              d="M0,128 L38,108 L72,142 L104,100 L142,132 L178,96 L214,126 L252,90 L288,120 L326,94 L362,124 L398,98 L434,130 L470,102 L506,122 L560,110"
              fill="none"
              stroke="#c9c9c7"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
            />
            <path
              className="tpi-crack-seal"
              d="M0,128 L38,108 L72,142 L104,100 L142,132 L178,96 L214,126 L252,90 L288,120 L326,94 L362,124 L398,98 L434,130 L470,102 L506,122 L560,110"
              fill="none"
              stroke="#0a8a3f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
            />
          </svg>
        </div>

        <h1 className="mt-6 sm:mt-8 text-[22px] sm:text-[26px] md:text-[30px] font-bold text-black leading-snug px-2">
          Sorry nha !!! <br /> &ldquo;Binn&rdquo; chưa code trang này ~~! <br />{" "}
          KKKKKK
        </h1>
        <p className="mt-4 max-w-[460px] text-[14px] sm:text-[15px] leading-relaxed text-[#4a4a4a] px-4">
          Đường link bạn tìm không tồn tại hoặc đã được di chuyển. TPI xử lý
          được mọi vết nứt bê tông — nhưng đường link này thì nằm ngoài danh mục
          sản phẩm của chúng tôi.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-sm bg-[#0a8a3f] px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#097535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8a3f]"
          >
            Về trang chủ
          </Link>
        </div>
      </div>

      <style>{`
        .tpi-crack-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
        }
        .tpi-crack-seal {
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
          opacity: 0.9;
        }

        @media (prefers-reduced-motion: no-preference) {
          .tpi-crack-line {
            stroke-dashoffset: 100;
            animation: tpi-draw-crack 0.7s ease-out 0.15s forwards;
          }
          .tpi-crack-seal {
            stroke-dashoffset: 100;
            animation: tpi-draw-crack 0.6s ease-out 0.75s forwards;
          }
        }

        @keyframes tpi-draw-crack {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
