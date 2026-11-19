import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  href: string;
  image: string;
  name: string;
  category: string;
  className?: string;
  sizes?: string;
  // Trong carousel ảnh nằm ngoài khung nhìn theo chiều ngang → lazy load sẽ hiện trắng khi trượt vào.
  eager?: boolean;
}

export default function ProjectCard({
  href,
  image,
  name,
  category,
  className,
  sizes = "(max-width: 768px) 50vw, 25vw",
  eager = false,
}: ProjectCardProps) {
  return (
    <Link href={href} className={cn("group relative block overflow-hidden", className)}>
      <Image
        src={image}
        alt={name}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Màn hình cảm ứng không có hover → luôn hiện tên dự án ở đáy card. */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent transition-colors duration-500 md:bg-none md:bg-black/20 md:group-hover:bg-black/55" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-3 text-center md:justify-center md:p-4">
        <p className="text-[11px] md:text-[16px] font-semibold text-[#ddd] transition-all duration-500 delay-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {category}
        </p>
        <p className="text-[14px] leading-snug md:text-2xl font-medium text-white transition-all duration-500 md:-translate-y-8 md:opacity-0 md:group-hover:translate-y-4 md:group-hover:opacity-100">
          {name}
        </p>
      </div>
    </Link>
  );
}
