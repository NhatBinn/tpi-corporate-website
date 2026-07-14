"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import Navigation from "./Navigation";
import { NavbarProps } from "@/types/common";

function Navbar({ categories } : NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="mx-auto w-full max-w-300 bg-transparent mt-2 flex flex-col absolute top-0 left-1/2 -translate-x-1/2 text-white z-50 px-4 md:px-0">
      <div className="hidden md:flex items-center text-[11px] font-bold tracking-wide">
        <span>TRUST - PASSION - INNOVATION</span>
        <span className="mx-4 h-4 w-px bg-white/50" />
        <span>NHÀ SẢN XUẤT HOÁ CHẤT XÂY DỰNG</span>
      </div>
      <div className="hidden md:block mt-2.5 mb-1.5 h-px w-full bg-white/50" />
      <nav className="flex gap-2 md:gap-4 items-center">
        <Image
          src="/TPI-logo-2025-169-nen-trang-cham-xanh-la.webp"
          width={90}
          height={60}
          alt="logo"
          className="w-14 md:w-[90px]"
        />
        <div className="hidden md:flex gap-3 ml-8">
          <Navigation categories={categories} />
        </div>
        <div className="hidden md:block">
          <Field orientation="horizontal">
            <Input
              type="search"
              placeholder="Search..."
              className="w-80 px-3 py-4 rounded-2xl placeholder:text-gray-300"
            />
          </Field>
        </div>
        <div className="flex items-center gap-0.5 ml-auto md:ml-0">
          <Link
            href="https://www.facebook.com/TPIVN"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white transition-all duration-300 hover:text-gray-500"
          >
            <FaFacebookF size={18} />
          </Link>

          <Link
            href="https://www.tiktok.com/@tpivn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white transition-all duration-300 hover:text-gray-500"
          >
            <FaTiktok size={18} />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            className="md:hidden ml-2 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-0 left-0 z-40 h-screen w-full bg-black/60 backdrop-blur-sm"
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

            <div className="px-4 py-4">
              <Field orientation="horizontal">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full px-3 py-3 rounded-xl border-gray-200 text-black placeholder:text-gray-400"
                />
              </Field>
            </div>

            <div className="border-t border-gray-100 px-4 py-2">
              <MobileMenuItem href="/" label="TRANG CHỦ" />
              <MobileMenuItem href="/san-pham" label="SẢN PHẨM" />
              <MobileMenuItem href="/giai-phap" label="GIẢI PHÁP" />
              <MobileMenuItem href="/du-an" label="DỰ ÁN" />
              <MobileMenuItem href="/gioi-thieu" label="GIỚI THIỆU" />
              <MobileMenuItem href="/tai-lieu" label="TÀI LIỆU & ỨNG DỤNG" />
              <MobileMenuItem href="/lien-he" label="LIÊN HỆ" />
            </div>

            <div className="border-t border-gray-100 px-4 py-4">
              <div className="flex items-center gap-3">
                <Link
                  href="https://www.facebook.com/TPIVN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#0a8a3f] hover:text-white"
                >
                  <FaFacebookF size={16} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@tpivn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#0a8a3f] hover:text-white"
                >
                  <FaTiktok size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileMenuItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block border-b border-gray-50 py-3 text-[14px] font-bold text-gray-700 transition-colors hover:text-[#0a8a3f]"
    >
      {label}
    </Link>
  );
}

export default Navbar;
