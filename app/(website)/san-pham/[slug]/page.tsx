import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FileText, Phone, MessageCircle } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/services/product.service";
import ProductDetailGallery from "@/components/product/ProductDetailGallery";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SectionTitle from "@/components/common/SectionTitle";
import InfoTable from "@/components/common/InfoTable";
import ProductCardBody from "@/components/common/ProductCard";
import { PRODUCT_PLACEHOLDER_IMAGE, ZALO_BUSINESS } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await getProductBySlug(slug);
  if (!res.success) return {};
  const p = res.data;
  return {
    title: p.seoTitle ?? p.name,
    description: p.seoDescription ?? p.description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const res = await getProductBySlug(slug);
  if (!res.success) notFound();
  const product = res.data;

  const relRes = await getRelatedProducts(product.category.id, slug);
  const relatedProducts = relRes.success ? relRes.data : [];

  const galleryImages =
    product.productImages.length > 0
      ? product.productImages.map((pi) => ({ url: pi.url, alt: pi.alt }))
      : [{ url: product.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE, alt: product.name }];

  const badges = [
    product.isNew && { label: "Mới", className: "bg-[#e5173f]" },
    product.isBestSeller && { label: "Bán chạy", className: "bg-[#ff8c00]" },
    product.isFeatured && { label: "Nổi bật", className: "bg-[#0a8a3f]" },
  ].filter((b): b is { label: string; className: string } => Boolean(b));

  return (
    <>
      <PageHeroBanner
        title={product.name}
        image="/Betong-duc-san.webp"
        darken
        breadcrumbs={[
          { label: "Sản phẩm", href: "/san-pham" },
          { label: product.category.name, href: `/san-pham?danh-muc=${product.category.slug}#danh-muc` },
          { label: product.name },
        ]}
      />

      <section className="container-site py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[45%_1fr] md:gap-12 lg:gap-16">
          <ProductDetailGallery images={galleryImages} productName={product.name} />

          <div className="flex flex-col">
            {badges.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b.label}
                    className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white ${b.className}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            )}

            <Link
              href={`/san-pham?danh-muc=${product.category.slug}#danh-muc`}
              className="mb-2 w-fit text-[12px] md:text-[13px] font-semibold uppercase tracking-wide text-brand hover:underline"
            >
              {product.category.name}
            </Link>

            <SectionTitle as="h1" className="text-[22px] md:text-[28px] lg:text-[32px]">
              {product.name}
            </SectionTitle>

            {product.description && (
              <p className="mt-4 text-[13px] md:text-[14px] leading-relaxed text-[#4a4a4a] line-clamp-4">
                {product.description}
              </p>
            )}

            <InfoTable
              variant="boxed"
              className="mt-5 md:mt-6"
              rows={[
                { label: "Cường độ nén", value: product.compressiveStrength },
                { label: "Tỷ lệ pha nước", value: product.waterDilutionRatio },
                { label: "Quy cách", value: product.pack },
              ]}
            />

            {product.pdfUrl && (
              <a
                href={product.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-sm border border-[#0a8a3f] px-4 py-2.5 text-[12px] md:text-[13px] font-semibold text-[#0a8a3f] transition-colors hover:bg-[#0a8a3f] hover:text-white"
              >
                <FileText size={15} />
                Tài liệu kỹ thuật (VI)
              </a>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 rounded-full bg-[#0a8a3f] px-6 py-3 text-[13px] md:text-[14px] font-bold text-white transition-colors hover:bg-[#097535]"
              >
                <Phone size={15} />
                Liên hệ ngay
              </Link>
              <a
                href={ZALO_BUSINESS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a8a3f] px-6 py-3 text-[13px] md:text-[14px] font-bold text-[#0a8a3f] transition-colors hover:bg-[#0a8a3f] hover:text-white"
              >
                <MessageCircle size={15} />
                Chat Zalo
              </a>
            </div>

            {product.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-[12px] text-[#696969]">Tags:</span>
                {product.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full border border-[#e5e5e5] px-3 py-1 text-[11px] text-[#4a4a4a]"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {product.sku && (
              <p className="mt-4 text-[12px] text-[#969696]">
                Mã sản phẩm: <span className="font-medium text-[#4a4a4a]">{product.sku}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5e5e5]">
        <div className="container-site">
          <div className="flex border-b border-[#e5e5e5]">
            <div className="border-b-2 border-[#0a8a3f] px-6 py-3.5 text-[13px] md:text-[14px] font-bold text-[#0a8a3f]">
              Mô tả
            </div>
          </div>
          <div className="py-8 md:py-10 text-[13px] md:text-[14px] leading-relaxed text-[#4a4a4a] whitespace-pre-wrap">
            {product.description ?? (
              <span className="italic text-[#969696]">Chưa có mô tả cho sản phẩm này.</span>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-[#e5e5e5] bg-[#f8f8f8]">
          <div className="container-site py-10 md:py-14">
            <SectionTitle>Sản phẩm tương tự</SectionTitle>
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
              {relatedProducts.map((p) => (
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
        </section>
      )}
    </>
  );
}
