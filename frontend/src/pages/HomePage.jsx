import Header from "../components/Layout/Header";
import TopBar from "../components/Layout/TopBar";
import Footer from "../components/Layout/Footer";
import Navigation from "../components/Layout/Navigation";
import HeroSection from "../components/homepage/HeroSection";
import FeatureStrips from "../components/homepage/FeatureStrips";
import BestDealsSection from "../components/homepage/BestDealsSection";
import ShopWithCategories from "../components/homepage/ShopWithCategories";
import FeaturedProducts from "../components/homepage/FeaturedProducts";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header />
      <Navigation />

      <main>
        <HeroSection />
        <FeatureStrips />
        <BestDealsSection />
        <ShopWithCategories />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}
