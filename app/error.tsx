"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Gửi log lỗi về hệ thống giám sát của bạn (Sentry, LogRocket, v.v.)
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-20">
      {/* Texture bê tông nhẹ phía sau, đồng bộ với trang 404 */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        aria-hidden="true"
      >
        <filter id="concrete-grain-error">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#concrete-grain-error)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">
          TPI — Tin Cậy · Nhiệt Huyết · Sáng Tạo
        </p>

        {/* Khe nứt đang rò rỉ */}
        <div className="relative mt-8 h-[140px] w-[220px]">
          <svg
            viewBox="0 0 220 140"
            className="h-full w-full"
            aria-hidden="true"
          >
            {/* Khe nứt tĩnh */}
            <path
              d="M20,40 L60,55 L95,35 L130,58 L160,38 L200,50"
              fill="none"
              stroke="#c9c9c7"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Giọt nước rơi lặp lại */}
            <circle
              className="tpi-drip"
              cx="95"
              cy="48"
              r="4.5"
              fill="#d97706"
            />

            {/* Gợn nước khi giọt chạm đáy */}
            <ellipse
              className="tpi-ripple"
              cx="95"
              cy="118"
              rx="6"
              ry="2.5"
              fill="none"
              stroke="#d97706"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-[26px] font-bold text-black sm:text-[30px]">
          Có chút rò rỉ trong hệ thống
        </h1>
        <p className="mt-4 max-w-[460px] text-[15px] leading-relaxed text-[#4a4a4a]">
          Đã có lỗi xảy ra khi tải trang này. Đội ngũ kỹ thuật đã được ghi nhận
          sự cố — bạn có thể thử lại ngay bây giờ.
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-[12px] text-[#c4c4c4]">
            Mã lỗi: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-sm bg-[#0a8a3f] px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#097535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8a3f]"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="rounded-sm border border-[#d4d4d4] px-7 py-3 text-[14px] font-semibold text-black transition-colors hover:border-[#0a8a3f] hover:text-[#0a8a3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8a3f]"
          >
            Về trang chủ
          </Link>
        </div>
      </div>

      <style>{`
        .tpi-drip {
          opacity: 0;
        }
        .tpi-ripple {
          opacity: 0;
        }

        @media (prefers-reduced-motion: no-preference) {
          .tpi-drip {
            animation: tpi-fall 2.2s ease-in infinite;
          }
          .tpi-ripple {
            animation: tpi-ripple-pulse 2.2s ease-out infinite;
          }
        }

        @keyframes tpi-fall {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          8% {
            opacity: 1;
          }
          70% {
            opacity: 1;
            transform: translateY(70px);
          }
          78% {
            opacity: 0;
            transform: translateY(70px);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }

        @keyframes tpi-ripple-pulse {
          0%, 65% {
            opacity: 0;
            transform: scale(0.6);
          }
          72% {
            opacity: 0.8;
            transform: scale(1);
          }
          90% {
            opacity: 0;
            transform: scale(1.8);
          }
          100% {
            opacity: 0;
            transform: scale(1.8);
          }
        }
      `}</style>
    </section>
  );
}
