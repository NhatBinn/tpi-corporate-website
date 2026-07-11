import Image from "next/image";
import Navigation from "./Navigation";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import Link from "next/link";

function Navbar() {
  return (
    <header className="mx-auto w-full max-w-300 bg-transparent mt-2 flex flex-col absolute top-0 left-1/2 -translate-x-1/2 text-white z-50">
      <div className="flex items-center text-[11px] font-bold tracking-wide">
        <span>TRUST - PASSION - INNOVATION</span>
        <span className="mx-4 h-4 w-px bg-white/50" />
        <span>NHÀ SẢN XUẤT HOÁ CHẤT XÂY DỰNG</span>
      </div>
      <div className="mt-2.5 mb-1.5 h-px w-full bg-white/50" />
      <nav className="flex gap-4 items-center">
        <Image
          src="/TPI-logo-2025-169-nen-trang-cham-xanh-la.webp"
          width={90}
          height={60}
          alt="logo"
        />
        <div className="flex gap-3 ml-8">
          <Navigation />
        </div>
        <div>
          <Field orientation="horizontal">
            <Input
              type="search"
              placeholder="Search..."
              className="w-80 px-3 py-4 rounded-2xl placeholder:text-gray-300"
            />
          </Field>
        </div>
        <div className="flex items-center gap-0.5">
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
