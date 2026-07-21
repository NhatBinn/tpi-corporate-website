import Features from "@/components/common/Features";
import EffortsImageSection from "@/components/introduction/EffortsImageSection";
import EffortsVideoSection from "@/components/introduction/EffortsVideoSection";
import FirstElement from "@/components/introduction/FirstElement";
import HeroBanner from "@/components/introduction/HeroBanner";
import JustDoItSection from "@/components/introduction/JustDoItSection";
import KeyPeopleSection from "@/components/introduction/KeyPeopleSection";

function IntroductionPage() {
  return (
    <>
      <HeroBanner />
      <section className="">
        <div className="mx-auto max-w-400">
          <FirstElement />
        </div>
        <JustDoItSection />
        <div className="mx-auto max-w-400">
          <KeyPeopleSection />
        </div>
        <EffortsImageSection />
        <EffortsVideoSection />
        <div className="mx-auto max-w-400">
          <Features />
        </div>
      </section>
    </>
  );
}

export default IntroductionPage;
