import Features from "@/components/common/Features";
import ProjectHeroBanner from "@/components/project/ProjectHeroBanner";
import { getProjectsBySlug } from "@/services/project.service";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await getProjectsBySlug(slug);

  if (!res.success) notFound();
  const project = res.data;

  return (
    <>
      <ProjectHeroBanner name={project.name} slug={slug} />
      <section>
        <div className="mx-auto max-w-350">
          <h1>{project.name}</h1>
          <Features />
        </div>
      </section>
    </>
  );
}
