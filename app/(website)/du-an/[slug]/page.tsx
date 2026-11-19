import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectsBySlug, getRelatedProjects } from "@/services/project.service";
import ProjectInfo from "@/components/project/ProjectInfo";
import ProjectCard from "@/components/project/ProjectCard";
import AccordionList from "@/components/common/AccordionList";
import Features from "@/components/common/Features";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SectionTitle from "@/components/common/SectionTitle";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await getProjectsBySlug(slug);
  if (!res.success) return {};
  const p = res.data;
  return {
    title: `${p.name} – TPI Dự Án`,
    description: p.excerpt ?? p.description ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const res = await getProjectsBySlug(slug);
  if (!res.success) notFound();
  const project = res.data;

  const relRes = await getRelatedProjects(project.category.id, slug);
  const relatedProjects = relRes.success ? relRes.data : [];

  const galleryImages =
    project.images.length > 0
      ? project.images
      : [{ id: "thumbnail", url: project.thumbnailUrl, alt: project.name, sortOrder: 0 }];

  const description = project.description ?? project.excerpt;

  return (
    <>
      <PageHeroBanner
        title={project.name}
        image={project.thumbnailUrl}
        darken
        breadcrumbs={[{ label: "Dự án", href: "/du-an" }, { label: project.name }]}
      />

      {/* Ảnh xếp dọc bên trái, thông tin dính theo khi cuộn bên phải */}
      <section className="container-site py-8 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10 lg:gap-14">
          <div className="flex flex-col gap-4 md:gap-6 md:flex-1">
            {galleryImages.map((img, i) => (
              <div key={img.id} className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                <Image
                  src={img.url}
                  alt={img.alt ?? project.name}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="shrink-0 md:sticky md:top-24 md:self-start md:w-[360px] lg:w-[400px]">
            <ProjectInfo project={project} />
          </div>
        </div>
      </section>

      <section className={cn("border-t border-[#e5e5e5]", description && "bg-[#f8f8f8]")}>
        <div className="container-site py-10 md:py-14">
          <div className="flex flex-col gap-10 md:flex-row md:gap-12 lg:gap-16">
            {description && (
              <div className="flex-1 min-w-0">
                <SectionTitle className="lg:text-[28px]">{project.name.toUpperCase()}</SectionTitle>
                <div className="mt-5 md:mt-6 text-[13px] md:text-[14px] leading-relaxed text-[#4a4a4a] whitespace-pre-wrap">
                  {description}
                </div>
              </div>
            )}
            <div className={description ? "shrink-0 md:w-[380px] lg:w-[420px]" : "w-full"}>
              <AccordionList />
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="border-t border-[#e5e5e5]">
          <div className="container-site py-10 md:py-14">
            <SectionTitle>Các dự án liên quan</SectionTitle>
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {relatedProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  href={`/du-an/${p.slug}`}
                  image={p.thumbnailUrl}
                  name={p.name}
                  category={p.category.name}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="aspect-[4/3] rounded-sm"
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/du-an"
                className="inline-flex items-center rounded-full border border-[#1a1a1a] px-6 py-2.5 text-[13px] font-bold text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
              >
                Xem tất cả dự án
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-[#e5e5e5]">
        <Features />
      </div>
    </>
  );
}
