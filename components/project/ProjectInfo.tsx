import { ProjectDetail } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";

export default function ProjectInfo({ project }: { project: ProjectDetail }) {
  const images =
    project.images.length > 0
      ? [...project.images].sort((a, b) => a.sortOrder - b.sortOrder)
      : [
          {
            id: "thumbnail",
            url: project.thumbnailUrl,
            alt: project.name,
            sortOrder: 0,
          },
        ];

  const metaRows = [
    { label: "Chủ đầu tư", value: project.investor },
    { label: "Tổng thầu", value: project.contractor },
    { label: "Phát triển dự án", value: "" },
    { label: "Tư vấn giám sát", value: "" },
    { label: "Tư vấn thiết kế", value: "" },
    { label: "Quản lý vận hành", value: "" },
    { label: "Thời gian thi công", value: project.constructionTime },
    {
      label: "Năm hoàn thành",
      value: project.completedYear ? String(project.completedYear) : null,
    },
  ];

  return (
    <div className="mx-auto grid grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-[1.5fr_1fr] lg:px-0">
      {/* ---------- Gallery ---------- */}
      <div className="flex flex-col gap-5">
        {images.map((image, index) => {
          const isLast = index === images.length - 1 && images.length > 1;
          return (
            <div
              key={image.id}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-200"
            >
              <Image
                src={image.url}
                alt={image.alt ?? project.name}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              {isLast && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-6 pb-5 pt-10">
                  <p className="text-[17px] font-extrabold tracking-wide text-white">
                    THÁP 1 DỰ ÁN {project.name.toUpperCase()}
                  </p>
                  <p className="text-[13px] font-bold tracking-widest text-white/85">
                    CHÍNH THỨC ĐƯỢC CẤT NÓC
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------- Info ---------- */}
      <div className="pt-1">
        <p className="mb-2 text-[18px] text-[#a5a5a5] font-semibold">
          {project.category.name}
          {project.completedYear ? ` (${project.completedYear})` : ""}
        </p>

        <h1 className="mb-3 text-[40px] font-bold leading-tight tracking-tight text-[#242424]">
          {project.name}
        </h1>

        {project.location && (
          <p className="mb-6 text-[16px] font-bold text-[#808080]">
            {project.location}
          </p>
        )}

        <div className="my-4 border-r-8 border-r-emerald-500 pr-6">
          <span className="text-[14px] inline-block px-1 py-0.5 font-semibold text-black">
            Sản phẩm TPI đã được sử dụng:
          </span>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-700">
            {project.projectProducts.map((el) => (
              <li key={el.product.id}>
                <Link
                  href={`/san-pham/${el.product.slug}`}
                  className="transition-colors hover:text-green-600"
                >
                  {el.product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <dl className="mt-1.5 border-t border-gray-200">
          {metaRows.map(({ label, value }) => (
            <div
              key={label}
              className="grid grid-cols-[180px_1fr] gap-4 border-b border-gray-200 py-4"
            >
              <dt className="text-[16px] font-semibold text-gray-900">
                {label}
              </dt>
              <dd className="text-[15px] text-gray-900">{value || "—"}</dd>
            </div>
          ))}
          <div className="flex flex-row justify-between items-center mt-3">
            <button className="px-4 md:px-6 py-2.5 md:py-3 text-[12px] md:text-[13px] font-bold uppercase tracking-wide transition-colors bg-[#212121] text-white cursor-pointer">
              Dự án khác
            </button>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.facebook.com/TPIVN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white"
              >
                <FaFacebookF size={16} />
              </Link>
              <Link
                href="https://www.tiktok.com/@tpivn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
              >
                <FaTiktok size={16} />
              </Link>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
