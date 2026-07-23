import Features from "@/components/common/Features";
import HeroBanner from "@/components/project/HeroBanner";
import ProjectListSection from "@/components/project/ProjectListSection";

async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ cats?: string }>;
}) {
  const { cats } = await searchParams;
  return (
    <>
      <HeroBanner />
      <section className="mx-auto max-w-350">
        <ProjectListSection active={cats ?? "all"} />
        <Features />
      </section>
    </>
  );
}

export default ProjectPage;
