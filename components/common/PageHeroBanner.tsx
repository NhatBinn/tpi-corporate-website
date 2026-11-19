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
        className={cn("object-cover object-bottom", darken ? "brightness-75" : "brightness-125")}
      />
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-r",
          darken ? "from-black/50 via-black/30 to-black/10" : "from-black/20 via-black/15 to-black/10",
        )}
      />

      {/* Cùng khung max-w-300 với Navbar để tiêu đề thẳng hàng với logo ở mọi kích thước màn hình. */}
      <div className="relative z-10 mx-auto mt-26 w-full max-w-300 px-4 xl:px-0">
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
                <span className="text-white/75">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
}
