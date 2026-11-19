import Link from "next/link";
import type { Metadata } from "next";
import { searchSite } from "@/services/search.service";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SearchForm from "@/components/common/SearchForm";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCardBody from "@/components/common/ProductCard";
import Features from "@/components/common/Features";
import ProjectGrid from "@/components/project/ProjectGrid";

type Props = { searchParams: Promise<{ q?: string | string[] }> };

async function getQuery(searchParams: Props["searchParams"]) {
  const { q } = await searchParams;
  const raw = Array.isArray(q) ? q[0] : q;
  return (raw ?? "").trim().slice(0, 100);
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = await getQuery(searchParams);
  return { title: q ? `Tìm kiếm: ${q}` : "Tìm kiếm" };
}

export default async function SearchPage({ searchParams }: Props) {
  const q = await getQuery(searchParams);
  const res = q ? await searchSite(q) : null;

  return (
    <>
      <PageHeroBanner title="Tìm kiếm" breadcrumbs={[{ label: "Tìm kiếm" }]} />

      <section className="container-site py-10 md:py-14">
        <SearchForm
          defaultValue={q}
          className="mx-auto max-w-2xl"
          inputClassName="h-12 rounded-full px-5 text-[15px]"
        />

        {!q && (
          <p className="mt-8 text-center text-[14px] text-[#9a9a9a]">
            Nhập tên sản phẩm, mã sản phẩm hoặc tên dự án để tìm kiếm.
          </p>
        )}

        {res && !res.success && (
          <p className="mt-8 text-center text-[14px] text-red-600">
            Có lỗi xảy ra khi tìm kiếm, vui lòng thử lại.
          </p>
        )}

        {res?.success && (
          <>
            <p className="mt-8 text-center text-[14px] text-[#696969]">
              {res.data.products.length + res.data.projects.length > 0 ? (
                <>
                  Tìm thấy <strong>{res.data.products.length}</strong> sản phẩm và{" "}
                  <strong>{res.data.projects.length}</strong> dự án cho &ldquo;{q}&rdquo;
                </>
              ) : (
                <>
                  Không tìm thấy kết quả nào cho &ldquo;{q}&rdquo;. Thử từ khoá khác hoặc{" "}
                  <Link href="/san-pham" className="text-[#0a8a3f] hover:underline">
                    xem tất cả sản phẩm
                  </Link>
                  .
                </>
              )}
            </p>

            {res.data.products.length > 0 && (
              <div className="mt-12">
                <SectionTitle>Sản phẩm ({res.data.products.length})</SectionTitle>
                <div className="mt-6 md:mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5 md:gap-x-6">
                  {res.data.products.map((p) => (
                    <Link
                      key={p.id}
                      href={`/san-pham/${p.slug}`}
                      className="group flex flex-col items-center text-center"
                    >
                      <ProductCardBody product={p} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {res.data.projects.length > 0 && (
              <div className="mt-14">
                <SectionTitle>Dự án ({res.data.projects.length})</SectionTitle>
                <div className="mt-6 md:mt-8">
                  <ProjectGrid projectList={res.data.projects} />
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <div className="border-t border-[#e5e5e5]">
        <Features />
      </div>
    </>
  );
}
