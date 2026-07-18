import Features from "@/components/common/Features";
import HeroBanner from "@/components/project/HeroBanner";

function ProjectPage() {
  return (
    <>
      <HeroBanner />
      <section className="mx-auto max-w-350">
        <div className="flex gap-4 px-4 md:px-6 mx-8">
          <div className="flex-1 mt-5">
            <h1>helo</h1>
          </div>
          <div className="flex-1 mt-5">
            <h1>helo</h1>
          </div>
        </div>
        <Features />
      </section>
    </>
  );
}

export default ProjectPage;
