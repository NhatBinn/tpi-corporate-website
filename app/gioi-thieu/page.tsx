import Features from "@/components/common/Features";
import FirstElement from "@/components/introduction/FirstElement";
import HeroBanner from "@/components/introduction/HeroBanner";

function IntroductionPage() {
  return (
    <>
      <HeroBanner />
      <section className="mx-auto max-w-400">
        <FirstElement />
        <Features />
      </section>
    </>
  );
}

export default IntroductionPage;
