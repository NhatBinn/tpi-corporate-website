import AboutIntroSection from "@/components/home/AboutIntroSection";
import HeroBanner from "@/components/home/HeroBanner";
import WidgetContainer from "@/components/home/HeroSlider";
import HomeProductsSection from "@/components/home/HomeProductsSection";
import PartnersAndFeaturesSection from "@/components/home/PartnersAndFeaturesSection";
import ProductAndPartnerSection from "@/components/home/ProjectsAndPartnersSection";
import QualityControlSection from "@/components/home/QualityControlSection";
import SolutionsOverviewSection from "@/components/home/SolutionsOverviewSection";

export default function Home() {
  return (
    <>
      <WidgetContainer />
      <HeroBanner />
      <AboutIntroSection />
      <QualityControlSection />
      <SolutionsOverviewSection />
      <HomeProductsSection />
      <ProductAndPartnerSection />
      <PartnersAndFeaturesSection />
    </>
  );
}
