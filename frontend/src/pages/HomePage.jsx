import { useState } from "react";
import Header from "../components/Layout/Header";
import TopBar from "../components/Layout/TopBar";
import Footer from "../components/Layout/Footer";
import Navigation from "../components/Layout/Navigation";
import HeroSection from "../components/homepage/HeroSection";
import FeatureStrips from "../components/homepage/FeatureStrips";
import BestDealsSection from "../components/homepage/BestDealsSection";
import ShopWithCategories from "../components/homepage/ShopWithCategories";
import FeaturedProducts from "../components/homepage/FeaturedProducts";
import TwoSideBanners from "../components/homepage/TwoSideBanners";
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header onMenuClick={() => setMobileMenuOpen(true)} />
      <Navigation
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <main>
        <HeroSection />
        <FeatureStrips />
        <BestDealsSection />
        <ShopWithCategories />
        <FeaturedProducts />
        <TwoSideBanners />
        
      </main>
      <Footer />
    </div>
  );
}
