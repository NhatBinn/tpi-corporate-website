import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SectionTitle from "@/components/common/SectionTitle";
import RichText from "@/components/common/RichText";
import ProductCardBody from "@/components/common/ProductCard";
import Features from "@/components/common/Features";
import { getSolutionBySlug, getSolutionsbyCategory } from "@/services/solution.service";
import { IMAGE_PLACEHOLDER } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await getSolutionBySlug(slug);
  if (!res.success) return {};
  return {
    title: `Giải pháp ${res.data.name}`,
    description: res.data.description ?? undefined,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;

  const res = await getSolutionBySlug(slug);
  if (!res.success) notFound();
  const solution = res.data;

  const allRes = await getSolutionsbyCategory();
  const others = allRes.success ? allRes.data.filter((s) => s.slug !== slug) : [];
  const image = solution.imageUrl ?? IMAGE_PLACEHOLDER;

  return (
    <>
      <PageHeroBanner
        title={solution.name}
        image={image}
        darken
        breadcrumbs={[{ label: "Giải pháp", href: "/giai-phap" }, { label: solution.name }]}
      />

      <section className="container-site grid grid-cols-1 gap-8 py-10 md:grid-cols-[minmax(0,1fr)_40%] md:gap-12 md:py-14">
        <div className="min-w-0">
          <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-wide text-brand">
            {solution.category.name}
          </p>
          <SectionTitle as="h1" className="mt-1 text-[24px] md:text-[34px]">
            Giải pháp {solution.name}
          </SectionTitle>
          {solution.description && (
            <p className="mt-5 text-[15px] md:text-[17px] font-medium leading-relaxed text-[#1a1a1a]">
              {solution.description}
            </p>
          )}
          {solution.content && <RichText content={solution.content} className="mt-6" />}

          <Link
            href="/lien-he"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] md:text-[14px] font-bold text-white transition-colors hover:bg-brand-dark"
          >
            <Phone size={15} />
            Nhận tư vấn giải pháp
          </Link>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4] md:sticky md:top-6 md:self-start">
          <Image
            src={image}
            alt={solution.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </section>

      {solution.products.length > 0 && (
        <section className="border-t border-[#e5e5e5] bg-[#f8f8f8]">
          <div className="container-site py-10 md:py-14">
            <SectionTitle>Sản phẩm đề xuất</SectionTitle>
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
              {solution.products.map((p) => (
                <Link key={p.id} href={`/san-pham/${p.slug}`} className="group flex flex-col items-center text-center">
                  <ProductCardBody product={p} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="container-site py-10 md:py-14">
          <SectionTitle>Giải pháp khác</SectionTitle>
          <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/giai-phap/${s.slug}`}
                className="group relative block aspect-square overflow-hidden"
              >
                <Image
                  src={s.imageUrl ?? IMAGE_PLACEHOLDER}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-wide text-white/75">
                    {s.category.name}
                  </p>
                  <p className="text-[15px] md:text-[18px] font-bold leading-snug text-white">{s.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Features />
    </>
  );
}
