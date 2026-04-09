import Header from "../components/Layout/Header";
import TopBar from "../components/Layout/TopBar";
import Footer from "../components/Layout/Footer";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header />
      <Footer />
    </div>
  );
}
