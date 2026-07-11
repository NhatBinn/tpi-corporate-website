"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ChevronUp } from "lucide-react";

const mapLocations = {
  "nha-may": {
    label: "Nhà Máy",
    embedSrc: "https://www.google.com/maps/embed?pb=YOUR_EMBED_ID_NHA_MAY",
  },
  "van-phong": {
    label: "Văn Phòng",
    embedSrc: "https://www.google.com/maps/embed?pb=YOUR_EMBED_ID_VAN_PHONG",
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
    <footer className="relative overflow-hidden border-t border-[#e5e5e5] bg-white px-4 md:px-6 py-12 md:py-16">
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-[160px] md:h-[220px] w-[350px] md:w-[500px] opacity-[0.04]"
        viewBox="0 0 500 220"
        fill="none"
        aria-hidden="true"
      >
        <rect x="20" y="60" width="80" height="160" stroke="#000" strokeWidth="2" />
        <rect x="120" y="30" width="60" height="190" stroke="#000" strokeWidth="2" />
        <rect x="200" y="80" width="100" height="140" stroke="#000" strokeWidth="2" />
        <rect x="320" y="10" width="70" height="210" stroke="#000" strokeWidth="2" />
        <rect x="410" y="70" width="80" height="150" stroke="#000" strokeWidth="2" />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-[380px_320px_1fr]">
        <div>
          <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-black">
            Cty TNHH Đầu Tư Phát Triển TPI
          </h3>
          <div className="mt-2 h-[3px] w-10 bg-[#e5173f]" />

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
          <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-black">Liên hệ</h3>
          <div className="mt-2 h-[3px] w-10 bg-[#e5173f]" />

          <div className="mt-6 flex flex-col gap-5 md:gap-6 text-[13px] md:text-[14px] text-[#4a4a4a]">
            <div>
              <p>
                KH doanh nghiệp{" "}
                <span className="font-bold text-black">Mr.Papa Kim</span>
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <span>ĐT: 0123 456 789</span>
                  <a
                    href="https://zalo.me/0933438323"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-[#0a8a3f] px-2 py-0.5 text-[11px] md:text-[12px] font-semibold text-white transition-colors hover:bg-[#097535]"
                  >
                    Zalo
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:cuongnguyen@tpi.pro.vn"
                    className="text-[#0a8a3f] hover:underline"
                  >
                    nhantran@tpi.pro.vn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p>
                KH cửa hàng, đại lý{" "}
                <span className="font-bold text-black">Mr.Nhân Trần</span>
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <span>ĐT: 0123 456 789</span>
                  <a
                    href="https://zalo.me/0901966846"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm bg-[#0a8a3f] px-2 py-0.5 text-[11px] md:text-[12px] font-semibold text-white transition-colors hover:bg-[#097535]"
                  >
                    Zalo
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:tu.nguyen@tpi.pro.vn"
                    className="text-[#0a8a3f] hover:underline"
                  >
                    papa.kim.cs2@tpi.pro.vn
                  </a>
                </li>
              </ul>
            </div>
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
