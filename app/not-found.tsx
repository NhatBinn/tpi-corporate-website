// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-20">
      {/* Texture bê tông rất nhẹ phía sau */}
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

        {/* Khối 404 + vết nứt */}
        <div className="relative mt-6 h-[180px] w-[560px] max-w-full">
          <span className="absolute inset-0 flex select-none items-center justify-center text-[140px] font-black leading-none tracking-tight text-[#1a1a1a] sm:text-[180px]">
            404
          </span>

          <svg
            viewBox="0 0 560 200"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* Đường nứt */}
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
            {/* Lớp trám xanh chạy theo sau, như đang được xử lý chống thấm */}
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

        <h1 className="mt-8 text-[26px] font-bold text-black sm:text-[30px]">
          {/* Trang này đã bị &quot;nứt&quot; mất rồi */}
          Sorry nha !!! <br /> &quot;Binn&quot; chưa code trang này ~~! <br />{" "}
          KKKKKK
        </h1>
        <p className="mt-4 max-w-[460px] text-[15px] leading-relaxed text-[#4a4a4a]">
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
          {/* <Link
            href="/san-pham"
            className="rounded-sm border border-[#d4d4d4] px-7 py-3 text-[14px] font-semibold text-black transition-colors hover:border-[#0a8a3f] hover:text-[#0a8a3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8a3f]"
          >
            Xem sản phẩm
          </Link> */}
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
