"use client";

import { Menu, X } from "lucide-react";
import SearchForm from "@/components/common/SearchForm";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SocialLinks from "@/components/common/SocialLinks";
import Navigation from "./Navigation";

const MOBILE_MENU = [
  { href: "/", label: "TRANG CHỦ" },
  { href: "/san-pham", label: "SẢN PHẨM" },
  { href: "/giai-phap", label: "GIẢI PHÁP" },
  { href: "/du-an", label: "DỰ ÁN" },
  { href: "/gioi-thieu", label: "GIỚI THIỆU" },
  { href: "/tai-lieu", label: "TÀI LIỆU & ỨNG DỤNG" },
  { href: "/blog", label: "BLOG" },
  { href: "/lien-he", label: "LIÊN HỆ" },
];

interface NavbarProps {
  megaMenuSlot: React.ReactNode;
  solutionMenuSlot: React.ReactNode;
}

function Navbar({ megaMenuSlot, solutionMenuSlot }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="container-site absolute inset-x-0 top-0 z-50 mt-2 flex flex-col bg-transparent text-white">
      {/* Căn giữa bằng inset-x-0 + mx-auto, KHÔNG dùng translate: transform làm overlay `fixed` của menu mobile bị neo theo header thay vì viewport. */}
      <div className="hidden md:flex items-center text-[11px] font-bold tracking-wide">
        <span>TRUST - PASSION - INNOVATION</span>
        <span className="mx-4 h-4 w-px bg-white/50" />
        <span>NHÀ SẢN XUẤT HOÁ CHẤT XÂY DỰNG</span>
      </div>
      <div className="hidden md:block mt-2.5 mb-1.5 h-px w-full bg-white/50" />
      <nav className="flex gap-2 md:gap-4 items-center">
        <Link href={"/"}>
          <Image
            src="/TPI-logo-2025-169-nen-trang-cham-xanh-la.webp"
            width={90}
            height={60}
            alt="logo"
            className="w-14 md:w-[90px]"
          />
        </Link>
        {/* Menu đầy đủ cần ~1100px → từ lg mới hiện, tablet dùng menu hamburger như mobile. */}
        <div className="hidden lg:flex gap-3 ml-4 xl:ml-8">
          <Navigation megaMenuSlot={megaMenuSlot} solutionMenuSlot={solutionMenuSlot} />
        </div>
        <SearchForm
          className="hidden lg:block"
          inputClassName="w-44 xl:w-80 px-3 py-4 rounded-2xl placeholder:text-gray-300"
        />
        <div className="flex items-center gap-0.5 ml-auto lg:ml-0">
          <SocialLinks
            className="gap-0.5"
            linkClassName="h-6 w-6 text-white hover:text-gray-500"
            iconSize={18}
          />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            className="lg:hidden ml-2 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 h-dvh w-full bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <span className="text-[13px] font-bold uppercase text-black">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Đóng menu"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-4 py-4 text-black">
              <SearchForm
                onSubmit={() => setMobileMenuOpen(false)}
                inputClassName="w-full px-3 py-3 rounded-xl border-gray-200 text-black placeholder:text-gray-400"
              />
            </div>

            <div className="border-t border-gray-100 px-4 py-2">
              {MOBILE_MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block border-b border-gray-50 py-3 text-[14px] font-bold text-gray-700 transition-colors hover:text-[#0a8a3f]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 px-4 py-4">
              <SocialLinks
                className="gap-3"
                linkClassName="h-9 w-9 bg-gray-100 text-gray-600 hover:bg-[#0a8a3f] hover:text-white"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
