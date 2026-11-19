"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ChevronUp } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";
import { ZALO_BUSINESS, ZALO_RETAIL } from "@/lib/constants";

const FOOTER_TITLE = "text-[15px] md:text-[16px] uppercase text-black";

const CONTACTS = [
  {
    segment: "KH doanh nghiệp",
    name: "Mr.Papa Kim",
    phone: "0933 43 83 23",
    zalo: ZALO_BUSINESS,
    email: "papa.kim.cs2@tpi.pro.vn",
  },
  {
    segment: "KH cửa hàng, đại lý",
    name: "Mr.Nhân Trần",
    phone: "0901 96 68 46",
    zalo: ZALO_RETAIL,
    email: "nhantran@tpi.pro.vn",
  },
];

// [x, rộng, cao] của từng toà nhà trên đường chân trời (viewBox 1440 × 240, đáy y = 240).
const BUILDINGS = [
  [0, 70, 110], [70, 50, 160], [120, 90, 90], [210, 60, 200], [270, 40, 140], [310, 110, 120],
  [420, 70, 185], [490, 50, 215], [540, 100, 100], [640, 60, 170], [700, 80, 130], [780, 50, 210],
  [830, 120, 95], [950, 70, 175], [1020, 40, 120], [1060, 90, 150], [1150, 60, 205], [1210, 100, 110],
  [1310, 70, 165], [1380, 60, 120],
];

// Phác hoạ đường nét thành phố mờ ở đáy footer, thay ảnh sketch toà nhà của web gốc.
function Skyline() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-black opacity-[0.06] md:h-60"
      viewBox="0 0 1440 240"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {BUILDINGS.map(([x, w, h]) => (
        <g key={x} strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <rect x={x + 4} y={240 - h} width={w - 8} height={h} />
          {Array.from({ length: Math.floor((h - 16) / 18) }, (_, i) => (
            <line key={i} x1={x + 12} x2={x + w - 12} y1={240 - h + 16 + i * 18} y2={240 - h + 16 + i * 18} strokeWidth="0.75" />
          ))}
        </g>
      ))}
    </svg>
  );
}

const mapLocations = {
  "nha-may": {
    label: "Nhà Máy",
    embedSrc:
      "https://maps.google.com/maps?q=82D+QL13%2C+L%C3%A1i+Thi%C3%AAu%2C+Thu%E1%BA%ADn+An%2C+B%C3%ACnh+D%C6%B0%C6%A1ng&output=embed",
  },
  "van-phong": {
    label: "Văn Phòng",
    embedSrc:
      "https://maps.google.com/maps?q=52+T%C3%A2n+H%E1%BA%A3i%2C+T%C3%A2n+B%C3%ACnh%2C+TP.HCM&output=embed",
  },
};

export default function Footer() {
  const [activeMap, setActiveMap] =
    useState<keyof typeof mapLocations>("nha-may");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-[#e5e5e5] bg-white py-12 md:py-16">
      <Skyline />

      <div className="container-site relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,380px)_minmax(0,320px)_1fr]">
        <div>
          <SectionTitle as="h3" className={FOOTER_TITLE}>
            Cty TNHH Đầu Tư Phát Triển TPI
          </SectionTitle>

          <div className="mt-6 flex flex-col gap-3 md:gap-4 text-[13px] md:text-[14px] text-[#4a4a4a]">
            <p>VP: 52 Tân Hải, P.Tân Bình, HCM</p>
            <p>ĐT: (+84) 028 66 857 867</p>
            <p>MST: 0313581680</p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@tpi.pro.vn"
                className="text-[#0a8a3f] hover:underline"
              >
                info@tpi.pro.vn
              </a>
            </p>
            <p>Mở cửa: Thứ Hai – Thứ Sáu: 8h00 – 17h00</p>
            <p>Nhà máy: 82D QL13, KP.Hòa Long, P.Lái Thiêu, TP.HCM</p>
          </div>

          <Link
            href="/lien-he"
            className="mt-6 md:mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a8a3f] px-5 md:px-6 py-2.5 md:py-3 text-[13px] md:text-[14px] font-semibold text-white transition-colors hover:bg-[#097535]"
          >
            <Plus size={16} />
            Liên hệ ngay
          </Link>

          <div className="mt-6 md:mt-8 flex items-center gap-2">
            <Image
              src="/TPI-logo-2025-original-nen-trong-02-150x48.webp"
              alt="TPI"
              width={70}
              height={40}
              className="h-auto w-[52px] md:w-[64px] object-contain"
            />
            <p className="text-[10px] md:text-[11px] font-semibold uppercase leading-tight text-[#9a9a9a]">
              Trust<br />Passion<br />Innovation
            </p>
          </div>
        </div>

        <div>
          <SectionTitle as="h3" className={FOOTER_TITLE}>
            Liên hệ
          </SectionTitle>

          <div className="mt-6 flex flex-col gap-5 md:gap-6 text-[13px] md:text-[14px] text-[#4a4a4a]">
            {CONTACTS.map((c) => (
              <div key={c.email}>
                <p>
                  {c.segment} <span className="font-bold text-black">{c.name}</span>
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <span>ĐT: {c.phone}</span>
                    <a
                      href={c.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm bg-[#0a8a3f] px-2 py-0.5 text-[11px] md:text-[12px] font-semibold text-white transition-colors hover:bg-[#097535]"
                    >
                      Zalo
                    </a>
                  </li>
                  <li>
                    Email:{" "}
                    <a href={`mailto:${c.email}`} className="text-[#0a8a3f] hover:underline">
                      {c.email}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="inline-flex">
            {(Object.keys(mapLocations) as Array<keyof typeof mapLocations>).map((key) => {
              const isActive = key === activeMap;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMap(key)}
                  className={`px-4 md:px-6 py-2.5 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-wide transition-colors ${
                    isActive
                      ? "bg-[#0a8a3f] text-white"
                      : "bg-[#e9e9e9] text-[#4a4a4a] hover:bg-[#dcdcdc]"
                  }`}
                >
                  {mapLocations[key].label}
                </button>
              );
            })}
          </div>

          <div className="mt-1 h-[180px] md:h-[260px] w-full max-w-full md:max-w-[460px] overflow-hidden">
            <iframe
              key={activeMap}
              src={mapLocations[activeMap].embedSrc}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Bản đồ ${mapLocations[activeMap].label} TPI`}
            />
          </div>

          <div className="mt-4 md:mt-6 flex items-center gap-4">
            <Image
              src="/VGBC-TRANS-300-X-250-150x125.webp"
              alt="Vietnam Green Building Council"
              width={120}
              height={60}
              className="h-auto w-auto max-w-[100px] md:max-w-none object-contain"
            />
            <Image
              src="/AQS-ISO-9001.webp"
              alt="Chứng nhận ISO 9001:2015 - IQS Global"
              width={120}
              height={60}
              className="h-auto w-auto max-w-[100px] md:max-w-none object-contain"
            />
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Cuộn lên đầu trang"
          className="cursor-pointer fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#4a4a4a] shadow-md transition-colors hover:text-[#0a8a3f]"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </footer>
  );
}
