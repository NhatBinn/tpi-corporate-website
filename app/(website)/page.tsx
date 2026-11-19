import AboutIntroSection from "@/components/home/AboutIntroSection";
import HeroSlider from "@/components/home/HeroSlider";
import HomeProductsSection from "@/components/home/HomeProductsSection";
import NewIdentitySection from "@/components/home/NewIdentitySection";
import PartnersAndFeaturesSection from "@/components/home/PartnersAndFeaturesSection";
import ProjectsAndPartnersSection from "@/components/home/ProjectsAndPartnersSection";
import QualityControlSection from "@/components/home/QualityControlSection";
import SolutionsOverviewSection from "@/components/home/SolutionsOverviewSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewIdentitySection />
      <AboutIntroSection />
      <QualityControlSection />
      <SolutionsOverviewSection />
      <HomeProductsSection />
      <ProjectsAndPartnersSection />
      <PartnersAndFeaturesSection />
    </>
  );
}
