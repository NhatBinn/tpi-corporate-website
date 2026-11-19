import Link from "next/link";
import { MapPin } from "lucide-react";
import type { ProjectDetail } from "@/types/common";
import SectionTitle from "@/components/common/SectionTitle";
import InfoTable from "@/components/common/InfoTable";
import SocialLinks from "@/components/common/SocialLinks";

export default function ProjectInfo({ project }: { project: ProjectDetail }) {
  return (
    <div className="flex flex-col">
      <p className="mb-2 text-[13px] font-semibold uppercase tracking-widest text-[#0a8a3f]">
        {project.category.name}
        {project.completedYear ? ` · ${project.completedYear}` : ""}
      </p>

      <SectionTitle as="h1" className="text-[32px] md:text-[38px] lg:text-[44px] tracking-tight">
        {project.name}
      </SectionTitle>

      {project.location && (
        <p className="mt-4 flex items-start gap-1.5 text-[14px] md:text-[15px] font-semibold text-[#696969]">
          <MapPin size={16} className="mt-0.5 shrink-0 text-[#0a8a3f]" />
          {project.location}
        </p>
      )}

      {project.projectProducts.length > 0 && (
        <div className="mt-5 border-r-4 border-[#0a8a3f] pr-4">
          <p className="text-[13px] font-bold uppercase tracking-wide text-[#1a1a1a]">
            Sản phẩm TPI đã được sử dụng:
          </p>
          <ul className="mt-3 space-y-2">
            {project.projectProducts.map(({ product }) => (
              <li key={product.id} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1a1a1a]" />
                <Link
                  href={`/san-pham/${product.slug}`}
                  className="text-[13px] md:text-[14px] font-medium text-[#1a1a1a] transition-colors hover:text-[#0a8a3f]"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <InfoTable
        className="mt-5"
        rows={[
          { label: "Chủ đầu tư", value: project.investor },
          { label: "Tổng thầu", value: project.contractor },
          { label: "Diện tích", value: project.area },
          { label: "Thời gian thi công", value: project.constructionTime },
          { label: "Năm hoàn thành", value: project.completedYear?.toString() },
        ]}
      />

      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          href="/du-an"
          className="inline-flex items-center rounded-sm bg-[#1a1a1a] px-5 py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#333]"
        >
          Dự án khác
        </Link>
        <SocialLinks brandColors className="gap-2.5" linkClassName="h-9 w-9 hover:opacity-80" iconSize={15} />
      </div>
    </div>
  );
}
