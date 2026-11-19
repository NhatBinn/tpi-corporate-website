import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, UserRound } from "lucide-react";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SectionTitle from "@/components/common/SectionTitle";
import RichText from "@/components/common/RichText";
import Features from "@/components/common/Features";
import PostCard from "@/components/blog/PostCard";
import {
  getPostBySlug,
  getPostCategories,
  getRecentPosts,
  getRelatedPosts,
} from "@/services/post.service";
import { formatDateVN } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPostBySlug(slug);
  if (!res.success) return {};
  const p = res.data;
  return {
    title: p.seoTitle ?? p.title,
    description: p.seoDescription ?? p.excerpt ?? undefined,
    openGraph: { images: [{ url: p.thumbnailUrl }] },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;

  const res = await getPostBySlug(slug);
  if (!res.success) notFound();
  const post = res.data;

  const [catRes, recentRes, relatedRes] = await Promise.all([
    getPostCategories(),
    getRecentPosts(5, slug),
    getRelatedPosts(post.categoryId, slug, 3),
  ]);
  const categories = catRes.success ? catRes.data : [];
  const recent = recentRes.success ? recentRes.data : [];
  const related = relatedRes.success ? relatedRes.data : [];

  return (
    <>
      <PageHeroBanner
        title={post.category.name}
        image={post.thumbnailUrl}
        darken
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.category.name, href: `/blog?danh-muc=${post.category.slug}` },
          { label: post.title },
        ]}
      />

      <section className="container-site grid grid-cols-1 gap-10 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <article className="min-w-0">
          <Link
            href={`/blog?danh-muc=${post.category.slug}`}
            className="text-[12px] md:text-[13px] font-semibold uppercase tracking-wide text-brand hover:underline"
          >
            {post.category.name}
          </Link>
          <h1 className="mt-2 text-[24px] md:text-[34px] font-bold leading-tight text-[#1a1a1a]">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#e5e5e5] pb-5 text-[13px] text-[#969696]">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              <time dateTime={post.publishedAt.toISOString()}>{formatDateVN(post.publishedAt)}</time>
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <UserRound size={14} />
                {post.author}
              </span>
            )}
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden bg-[#f4f4f4]">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {post.excerpt && (
            <p className="mt-6 text-[15px] md:text-[17px] font-medium leading-relaxed text-[#1a1a1a]">{post.excerpt}</p>
          )}

          <RichText content={post.content} className="mt-6" />
        </article>

        <aside className="flex flex-col gap-10 lg:sticky lg:top-6 lg:self-start">
          {categories.length > 0 && (
            <div>
              <SectionTitle as="h2" className="text-[16px] md:text-[18px] uppercase">
                Chuyên mục
              </SectionTitle>
              <ul className="mt-4 flex flex-col">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/blog?danh-muc=${c.slug}`}
                      className="flex items-center justify-between border-b border-[#f0f0f0] py-2.5 text-[14px] text-[#4a4a4a] transition-colors hover:text-brand"
                    >
                      {c.name}
                      <span className="text-[12px] text-[#969696]">({c.postCount})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recent.length > 0 && (
            <div>
              <SectionTitle as="h2" className="text-[16px] md:text-[18px] uppercase">
                Bài viết mới
              </SectionTitle>
              <ul className="mt-4 flex flex-col gap-4">
                {recent.map((p) => (
                  <li key={p.id}>
                    <Link href={`/blog/${p.slug}`} className="group flex gap-3">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-[#f4f4f4]">
                        <Image src={p.thumbnailUrl} alt={p.title} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-[#1a1a1a] transition-colors group-hover:text-brand">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[12px] text-[#969696]">{formatDateVN(p.publishedAt)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-brand p-6 text-white">
            <p className="text-[18px] font-bold leading-snug">Cần tư vấn giải pháp cho công trình?</p>
            <p className="mt-2 text-[13px] text-white/85">Đội ngũ kỹ thuật TPI sẵn sàng hỗ trợ bạn.</p>
            <Link
              href="/lien-he"
              className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-brand transition-colors hover:bg-white/90"
            >
              Liên hệ ngay
            </Link>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="border-t border-[#e5e5e5] bg-[#f8f8f8]">
          <div className="container-site py-10 md:py-14">
            <SectionTitle>Bài viết liên quan</SectionTitle>
            <div className="mt-6 md:mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Features />
    </>
  );
}
