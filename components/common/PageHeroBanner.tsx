import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IMAGE_PLACEHOLDER } from "@/lib/constants";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroBannerProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  image?: string;
  // Ảnh do người dùng upload có thể sáng → làm tối để chữ trắng đọc được.
  darken?: boolean;
}

export default function PageHeroBanner({
  title,
  breadcrumbs,
  image = IMAGE_PLACEHOLDER,
  darken = false,
}: PageHeroBannerProps) {
  const crumbs: Breadcrumb[] = [{ label: "Trang chủ", href: "/" }, ...breadcrumbs];

  return (
    <section className="relative flex min-h-50 md:min-h-80 items-center overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className={cn("object-cover object-bottom", darken ? "brightness-75" : "brightness-95")}
      />
      {/* Ảnh mặc định rất sáng → luôn phủ đủ tối để chữ trắng, breadcrumb và ô tìm kiếm trên header đọc được. */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-r",
          darken ? "from-black/60 via-black/40 to-black/20" : "from-black/55 via-black/35 to-black/20",
        )}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/35 to-transparent" />

      <div className="container-site relative z-10 mt-26">
        <h1 className="-mt-2 text-[36px] md:text-[60px] lg:text-[68px] leading-tight text-white font-medium">
          {title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-2 flex flex-wrap items-center gap-1.5 text-[14px] text-white">
          {crumbs.map((crumb, i) => (
            <Fragment key={crumb.label + i}>
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                // Mục cuối thường là tên bài viết/sản phẩm dài → cắt 1 dòng để breadcrumb không chiếm 2–3 dòng trên mobile.
                <span className="max-w-full truncate text-white/80 sm:max-w-md" title={crumb.label}>
                  {crumb.label}
                </span>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
}
