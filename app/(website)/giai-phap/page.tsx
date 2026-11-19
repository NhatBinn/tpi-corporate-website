import type { Metadata } from "next";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SectionTitle from "@/components/common/SectionTitle";
import SolutionForm from "@/components/common/SolutionForm";
import Features from "@/components/common/Features";

export const metadata: Metadata = {
  title: "Giải pháp",
  description:
    "Hệ giải pháp hoá chất xây dựng TPI cho nhà xưởng, nhà cao tầng, nhà máy bê tông, cửa hàng VLXD và thầu thợ.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeroBanner title="Giải pháp" image="/Slider-8.webp" darken breadcrumbs={[{ label: "Giải pháp" }]} />

      <section className="container-site py-10 md:py-14">
        <SectionTitle className="uppercase">Giải pháp theo loại công trình</SectionTitle>
        <p className="mt-4 max-w-3xl text-[14px] md:text-[15px] leading-relaxed text-[#4a4a4a]">
          Mỗi loại công trình có yêu cầu kỹ thuật riêng. TPI xây dựng hệ sản phẩm đồng bộ cho từng nhóm khách hàng — từ
          nhà thầu cao tầng, chủ đầu tư nhà xưởng đến nhà máy bê tông và cửa hàng vật liệu xây dựng — giúp tối ưu chi phí
          và đảm bảo chất lượng thi công.
        </p>
        <SolutionForm />
      </section>

      <Features />
    </>
  );
}
