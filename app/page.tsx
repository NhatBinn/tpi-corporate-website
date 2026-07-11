import AboutIntroSection from "@/components/common/main/AboutIntroSection";
import HeroBanner from "@/components/common/main/HeroBanner";
import HomeProductsSection from "@/components/common/main/HomeProductsSection";
import PartnersAndFeaturesSection from "@/components/common/main/PartnersAndFeaturesSection";
import ProductAndPartnerSection from "@/components/common/main/ProductAndPartnerSection";
import QualityControlSection from "@/components/common/main/QualityControlSection";
import SolutionsOverviewSection from "@/components/common/main/SolutionCard";
import WidgetContainer from "@/components/common/main/WidgetContainer";

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
