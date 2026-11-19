import Features from "@/components/common/Features";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ProjectListSection from "@/components/project/ProjectListSection";

async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ cats?: string }>;
}) {
  const { cats } = await searchParams;
  return (
    <>
      <PageHeroBanner title="Dự án" breadcrumbs={[{ label: "Dự án" }]} />
      <section className="mx-auto max-w-350">
        <ProjectListSection cats={cats ?? "all"} />
        <Features />
      </section>
    </>
  );
}

export default ProjectPage;
