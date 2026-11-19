import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { formatDateVN } from "@/lib/utils";

export interface PostCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnailUrl: string;
  publishedAt: Date;
  category: { name: string; slug: string };
}

export default function PostCard({ post }: { post: PostCardData }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#f4f4f4]">
        <Image
          src={post.thumbnailUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {post.category.name}
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="flex items-center gap-1.5 text-[12px] text-[#969696]">
          <CalendarDays size={13} />
          <time dateTime={post.publishedAt.toISOString()}>{formatDateVN(post.publishedAt)}</time>
        </p>
        <h3 className="mt-2 text-[16px] md:text-[18px] font-bold leading-snug text-[#1a1a1a] transition-colors group-hover:text-brand">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-[13px] md:text-[14px] leading-relaxed text-[#696969]">{post.excerpt}</p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-3 w-fit text-[13px] font-semibold text-brand hover:underline"
        >
          Đọc tiếp →
        </Link>
      </div>
    </article>
  );
}
