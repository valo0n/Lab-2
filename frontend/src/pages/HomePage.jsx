import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/homepage/HeroSection";
import FeatureStrips from "../components/homepage/FeatureStrips";
import BestDealsSection from "../components/homepage/BestDealsSection";
import ShopWithCategories from "../components/homepage/ShopWithCategories";
import FeaturedProducts from "../components/homepage/FeaturedProducts";
import TwoSideBanners from "../components/homepage/TwoSideBanners";
import ComputerAccessories from "../components/homepage/ComputerAccessories";
import MacBookProBanner from "../components/homepage/MacBookProBanner";
import FourColumnLists from "../components/homepage/FourColumnLists";
import LatestNews from "../components/homepage/LatestNews";
import NewsletterSection from "../components/homepage/NewsletterSection";
import ProductQuickView from "../components/products/ProductQuickView";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Only one popup open at a time
  const toggleCart = () => {
    setCartOpen((v) => !v);
    setWishlistOpen(false);
    setAccountOpen(false);
  };
  const toggleWishlist = () => {
    setWishlistOpen((v) => !v);
    setCartOpen(false);
    setAccountOpen(false);
  };
  const toggleAccount = () => {
    setAccountOpen((v) => !v);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
        cartOpen={cartOpen}
        onCartToggle={toggleCart}
        wishlistOpen={wishlistOpen}
        onWishlistToggle={toggleWishlist}
        accountOpen={accountOpen}
        onAccountToggle={toggleAccount}
      />
      <Navigation
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <main>
        <HeroSection />
        <FeatureStrips />
        <BestDealsSection onQuickView={setQuickViewProduct} />
        <ShopWithCategories />
        <FeaturedProducts onQuickView={setQuickViewProduct} />
        <TwoSideBanners />
        <ComputerAccessories onQuickView={setQuickViewProduct} />
        <MacBookProBanner />
        <FourColumnLists />
        <LatestNews />
        <NewsletterSection />
      </main>

      <Footer />

      <ProductQuickView
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
}
