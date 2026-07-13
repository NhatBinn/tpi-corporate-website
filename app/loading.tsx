export default function Loading() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        aria-hidden="true"
      >
        <filter id="concrete-grain-loading">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#concrete-grain-loading)"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">
          TPI — Tin Cậy · Nhiệt Huyết · Sáng Tạo
        </p>

        <h1 className="mt-6 text-[24px] font-bold text-black sm:text-[28px]">
          Đang trải phẳng nội dung
        </h1>
        <p className="mt-3 max-w-[380px] text-[14px] leading-relaxed text-[#4a4a4a]">
          Chỉ một chút nữa thôi — mượt như lớp vữa tự san TPI.
        </p>

        {/* Khay chứa - đại diện bề mặt đang được san phẳng */}
        <div className="relative mt-8 h-[14px] w-[280px] overflow-hidden rounded-full bg-[#e9e9e9] sm:w-[320px]">
          <span className="tpi-load-bar-1 absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0a8a3f] to-[#3fb56a]" />
          <span className="tpi-load-bar-2 absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0a8a3f] to-[#3fb56a]" />
        </div>
      </div>

      <style>{`
        .tpi-load-bar-1,
        .tpi-load-bar-2 {
          width: 40%;
        }

        /* Fallback tĩnh nếu người dùng bật giảm chuyển động */
        .tpi-load-bar-2 {
          opacity: 0;
        }

        @media (prefers-reduced-motion: no-preference) {
          .tpi-load-bar-1 {
            animation: tpi-indeterminate-1 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .tpi-load-bar-2 {
            opacity: 1;
            animation: tpi-indeterminate-2 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            animation-delay: 0.55s;
          }
        }

        @keyframes tpi-indeterminate-1 {
          0% {
            left: -40%;
            width: 40%;
          }
          60% {
            left: 100%;
            width: 55%;
          }
          100% {
            left: 100%;
            width: 55%;
          }
        }

        @keyframes tpi-indeterminate-2 {
          0% {
            left: -60%;
            width: 30%;
          }
          80% {
            left: 100%;
            width: 45%;
          }
          100% {
            left: 100%;
            width: 45%;
          }
        }
      `}</style>
    </section>
  );
}
