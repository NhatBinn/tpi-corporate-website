import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SectionTitle from "@/components/common/SectionTitle";
import Features from "@/components/common/Features";
import { DOC_POST_LINKS, DOCUMENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tài liệu & ứng dụng",
  description: "Catalogue, tài liệu giải pháp, hướng dẫn thi công và ứng dụng sản phẩm hoá chất xây dựng TPI.",
};

const POST_LINK_DESC: Record<(typeof DOC_POST_LINKS)[number]["label"], string> = {
  "Hướng dẫn thi công": "Quy trình thi công chuẩn, định mức và lưu ý kỹ thuật cho từng sản phẩm.",
  "Ứng dụng sản phẩm": "Sản phẩm TPI trong thực tế công trình: cao tầng, nhà xưởng, bê tông đúc sẵn.",
  "Thông báo về sản phẩm": "Sản phẩm mới, thay đổi quy cách bao bì và các thông báo quan trọng.",
};

export default function DocumentsPage() {
  return (
    <>
      <PageHeroBanner title="Tài liệu & ứng dụng" breadcrumbs={[{ label: "Tài liệu & ứng dụng" }]} />

      <section id="catalogue" className="container-site grid scroll-mt-6 grid-cols-1 gap-10 py-10 md:grid-cols-[minmax(0,1fr)_42%] md:gap-14 md:py-14">
        <div className="min-w-0">
          <SectionTitle className="uppercase">Catalogue</SectionTitle>
          <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-[#4a4a4a]">
            Tải về bộ tài liệu giải pháp của TPI để tra cứu thông số kỹ thuật, định mức sử dụng và hệ sản phẩm phù hợp
            cho từng loại công trình.
          </p>

          <ul className="mt-6 flex flex-col">
            {DOCUMENTS.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 border-b border-[#e5e5e5] py-4 transition-colors"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <FileText size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-[15px] md:text-[16px] font-bold text-[#1a1a1a] transition-colors group-hover:text-brand">
                      {doc.title}
                      <ExternalLink size={14} className="shrink-0 text-[#969696]" />
                    </span>
                    <span className="mt-1 block text-[13px] md:text-[14px] text-[#696969]">{doc.desc}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center rounded-md bg-[#f4f4f4] p-6 md:self-start">
          <Image
            src="/Mockup-San-Pham-Chong-Tham.jpeg"
            width={580}
            height={580}
            alt="Mockup sản phẩm chống thấm TPI"
            className="h-auto w-full object-contain drop-shadow-md"
          />
        </div>
      </section>

      <section className="bg-[#f8f8f8]">
        <div className="container-site py-10 md:py-14">
          <SectionTitle className="uppercase">Hướng dẫn & ứng dụng</SectionTitle>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DOC_POST_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col border-t-4 border-brand bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <p className="text-[18px] md:text-[20px] font-bold text-[#1a1a1a] transition-colors group-hover:text-brand">
                  {item.label}
                </p>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#696969]">{POST_LINK_DESC[item.label]}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                  Xem bài viết <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Features />
    </>
  );
}
