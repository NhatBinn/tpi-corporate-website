import Link from "next/link";
import type { Metadata } from "next";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import Features from "@/components/common/Features";
import PostCard from "@/components/blog/PostCard";
import { getPostCategories, getPosts } from "@/services/post.service";
import { cn } from "@/lib/utils";

type SearchParams = { "danh-muc"?: string | string[]; trang?: string | string[] };
type Props = { searchParams: Promise<SearchParams> };

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function blogHref(categorySlug: string | undefined, page = 1) {
  const params = new URLSearchParams();
  if (categorySlug) params.set("danh-muc", categorySlug);
  if (page > 1) params.set("trang", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const slug = first((await searchParams)["danh-muc"]);
  const cats = await getPostCategories();
  const current = cats.success ? cats.data.find((c) => c.slug === slug) : undefined;
  return {
    title: current ? current.name : "Blog",
    description: "Tin tức, hoạt động và hướng dẫn thi công hoá chất xây dựng từ TPI.",
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const categorySlug = first(params["danh-muc"]) || undefined;
  const page = Math.max(1, Number.parseInt(first(params.trang) ?? "1", 10) || 1);

  const [catRes, postRes] = await Promise.all([getPostCategories(), getPosts(categorySlug, page)]);
  const categories = catRes.success ? catRes.data : [];
  const currentCategory = categories.find((c) => c.slug === categorySlug);

  const tabs = [{ slug: undefined, name: "Tất cả" }, ...categories];

  return (
    <>
      <PageHeroBanner
        title={currentCategory?.name ?? "Blog"}
        image="/Cong-Truong-tong-hop-1398x606-BW.webp"
        darken
        breadcrumbs={[
          { label: "Blog", href: currentCategory ? "/blog" : undefined },
          ...(currentCategory ? [{ label: currentCategory.name }] : []),
        ]}
      />

      <section className="container-site py-10 md:py-14">
        <nav aria-label="Chuyên mục" className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <ul className="flex min-w-max gap-2 border-b border-[#e5e5e5] md:min-w-0 md:flex-wrap">
            {tabs.map((tab) => {
              const active = tab.slug === categorySlug;
              return (
                <li key={tab.slug ?? "all"}>
                  <Link
                    href={blogHref(tab.slug)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "-mb-px block border-b-2 px-4 py-3 text-[13px] md:text-[14px] font-bold uppercase tracking-wide transition-colors",
                      active
                        ? "border-brand text-brand"
                        : "border-transparent text-[#696969] hover:text-brand",
                    )}
                  >
                    {tab.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {!postRes.success && (
          <p className="mt-10 text-center text-[14px] text-red-600">
            Có lỗi xảy ra khi tải bài viết, vui lòng thử lại.
          </p>
        )}

        {postRes.success && postRes.data.items.length === 0 && (
          <p className="mt-10 text-center text-[14px] text-[#969696]">Chưa có bài viết nào trong chuyên mục này.</p>
        )}

        {postRes.success && postRes.data.items.length > 0 && (
          <>
            <div className="mt-8 md:mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {postRes.data.items.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {postRes.data.totalPages > 1 && (
              <nav aria-label="Phân trang" className="mt-12 flex flex-wrap justify-center gap-2">
                {Array.from({ length: postRes.data.totalPages }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    href={blogHref(categorySlug, n)}
                    aria-current={n === page ? "page" : undefined}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border text-[14px] font-semibold transition-colors",
                      n === page
                        ? "border-brand bg-brand text-white"
                        : "border-[#e5e5e5] text-[#4a4a4a] hover:border-brand hover:text-brand",
                    )}
                  >
                    {n}
                  </Link>
                ))}
              </nav>
            )}
          </>
        )}
      </section>

      <Features />
    </>
  );
}
