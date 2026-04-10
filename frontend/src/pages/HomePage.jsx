import Header from "../components/Layout/Header";
import TopBar from "../components/Layout/TopBar";
import Footer from "../components/Layout/Footer";
import Navigation from "../components/Layout/Navigation";
import HeroSection from "../components/homepage/HeroSection";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header />
      <Navigation />

      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
