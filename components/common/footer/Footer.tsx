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
    <footer className="relative overflow-hidden border-t border-[#e5e5e5] bg-white px-6 py-16">
      {/* Hoạ tiết nhà xưởng mờ phía sau */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-[220px] w-[500px] opacity-[0.04]"
        viewBox="0 0 500 220"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="20"
          y="60"
          width="80"
          height="160"
          stroke="#000"
          strokeWidth="2"
        />
        <rect
          x="120"
          y="30"
          width="60"
          height="190"
          stroke="#000"
          strokeWidth="2"
        />
        <rect
          x="200"
          y="80"
          width="100"
          height="140"
          stroke="#000"
          strokeWidth="2"
        />
        <rect
          x="320"
          y="10"
          width="70"
          height="210"
          stroke="#000"
          strokeWidth="2"
        />
        <rect
          x="410"
          y="70"
          width="80"
          height="150"
          stroke="#000"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[380px_320px_1fr]">
        {/* Cột 1: Thông tin công ty */}
        <div>
          <h3 className="text-[16px] font-bold uppercase text-black">
            Cty TNHH Đầu Tư Phát Triển TPI
          </h3>
          <div className="mt-2 h-[3px] w-10 bg-[#e5173f]" />

          <div className="mt-6 flex flex-col gap-4 text-[14px] text-[#4a4a4a]">
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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a8a3f] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#097535]"
          >
            <Plus size={16} />
            Liên hệ ngay
          </Link>

          <div className="mt-8 flex items-center gap-2">
            <Image
              src="/TPI-logo-2025-original-nen-trong-02-150x48.webp"
              alt="TPI"
              width={70}
              height={40}
              className="h-auto w-[64px] object-contain"
            />
            <p className="text-[11px] font-semibold uppercase leading-tight text-[#9a9a9a]">
              Trust
              <br />
              Passion
              <br />
              Innovation
            </p>
          </div>
        </div>

        {/* Cột 2: Liên hệ */}
        <div>
          <h3 className="text-[16px] font-bold uppercase text-black">
            Liên hệ
          </h3>
          <div className="mt-2 h-[3px] w-10 bg-[#e5173f]" />

          <div className="mt-6 flex flex-col gap-6 text-[14px] text-[#4a4a4a]">
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
                    className="rounded-sm bg-[#0a8a3f] px-2 py-0.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#097535]"
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
                    className="rounded-sm bg-[#0a8a3f] px-2 py-0.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#097535]"
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

        {/* Cột 3: Bản đồ + chứng nhận */}
        <div>
          <div className="inline-flex">
            {(
              Object.keys(mapLocations) as Array<keyof typeof mapLocations>
            ).map((key) => {
              const isActive = key === activeMap;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMap(key)}
                  className={`px-6 py-3 text-[13px] font-bold uppercase tracking-wide transition-colors ${
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

          <div className="mt-1 h-[260px] w-full max-w-[460px] overflow-hidden">
            <iframe
              key={activeMap}
              src={mapLocations[activeMap].embedSrc}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Bản đồ ${mapLocations[activeMap].label} TPI`}
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/VGBC-TRANS-300-X-250-150x125.webp"
              alt="Vietnam Green Building Council"
              width={120}
              height={60}
              className="object-contain"
            />
            <Image
              src="/AQS-ISO-9001.webp"
              alt="Chứng nhận ISO 9001:2015 - IQS Global"
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Nút cuộn lên đầu trang */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Cuộn lên đầu trang"
          className="cursor-pointer fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#4a4a4a] shadow-md transition-colors hover:text-[#0a8a3f]"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
}
