import Features from "@/components/common/Features";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import EffortsVideoSection from "@/components/introduction/EffortsVideoSection";
import FirstElement from "@/components/introduction/FirstElement";
import JustDoItSection from "@/components/introduction/JustDoItSection";
import KeyPeopleSection from "@/components/introduction/KeyPeopleSection";

function IntroductionPage() {
  return (
    <>
      <PageHeroBanner title="Giới thiệu" breadcrumbs={[{ label: "Giới thiệu" }]} />
      <FirstElement />
      <JustDoItSection />
      <KeyPeopleSection />
      <EffortsVideoSection />
      <Features />
    </>
  );
}

export default IntroductionPage;
