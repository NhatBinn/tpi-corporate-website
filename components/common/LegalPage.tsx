import Link from "next/link";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import RichText from "@/components/common/RichText";
import Features from "@/components/common/Features";
import { POLICY_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface LegalSection {
  // Dùng làm anchor (#id) cho mục lục và link từ khối Features.
  id: string;
  title: string;
  // Định dạng của <RichText />.
  content: string;
}

interface LegalPageProps {
  title: string;
  // Đường dẫn trang hiện tại, để đánh dấu trong danh sách chính sách.
  href: string;
  updatedAt: string;
  intro?: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, href, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <>
      <PageHeroBanner title={title} breadcrumbs={[{ label: "Chính sách" }, { label: title }]} />

      <section className="container-site grid grid-cols-1 gap-10 py-10 md:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        <aside className="flex flex-col gap-8 lg:sticky lg:top-6 lg:self-start">
          <nav aria-label="Mục lục">
            <p className="text-[13px] font-bold uppercase tracking-wide text-black">Mục lục</p>
            <ol className="mt-3 flex flex-col gap-2 border-l-2 border-[#e5e5e5] text-[14px]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-0.5 block border-l-2 border-transparent pl-3 text-[#696969] transition-colors hover:border-brand hover:text-brand"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <nav aria-label="Các chính sách khác">
            <p className="text-[13px] font-bold uppercase tracking-wide text-black">Chính sách</p>
            <ul className="mt-3 flex flex-col gap-2 text-[14px]">
              {POLICY_LINKS.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={p.href === href ? "page" : undefined}
                    className={cn(
                      "transition-colors hover:text-brand",
                      p.href === href ? "font-bold text-brand" : "text-[#696969]",
                    )}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0">
          <p className="text-[13px] text-[#969696]">Cập nhật lần cuối: {updatedAt}</p>
          {intro && <RichText content={intro} className="mt-4" />}

          <div className="mt-6 flex flex-col gap-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-6">
                <h2 className="text-[18px] md:text-[22px] font-bold leading-snug text-[#1a1a1a]">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-2 h-[3px] w-10 bg-brand-red" />
                <RichText content={s.content} className="mt-4" />
              </section>
            ))}
          </div>

          <div className="mt-12 border-l-4 border-brand bg-[#f4f4f4] px-5 py-4 text-[14px] text-[#4a4a4a]">
            Mọi thắc mắc về chính sách, vui lòng liên hệ hotline{" "}
            <a href="tel:02866857867" className="font-bold text-brand hover:underline">
              (+84) 028 66 857 867
            </a>{" "}
            hoặc email{" "}
            <a href="mailto:info@tpi.pro.vn" className="font-bold text-brand hover:underline">
              info@tpi.pro.vn
            </a>
            .
          </div>
        </article>
      </section>

      <Features />
    </>
  );
}
