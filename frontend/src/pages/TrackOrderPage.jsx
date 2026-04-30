import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Home, Info, ArrowRight } from "lucide-react";

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header />
      <Navigation />

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Home size={15} />
          <span>Home</span>
          <span>{">"}</span>
          <span>Pages</span>
          <span>{">"}</span>
          <span className="text-blue-500">Track Order</span>
        </div>
      </div>

      <main className="bg-white min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 pt-14">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold text-gray-900 mb-5">
              Track Order
            </h1>

            <p className="text-sm text-gray-500 leading-6 mb-6 max-w-xl">
              To track your order please enter your order ID in the input field
              below and press the “Track Order” button. this was given to you on
              your receipt and in the confirmation email you should have
              received.
            </p>

            <div className="grid grid-cols-2 gap-5 mb-4">
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  placeholder="ID..."
                  className="w-full h-11 border border-gray-200 px-4 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Billing Email
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full h-11 border border-gray-200 px-4 text-sm outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Info size={16} />
              <span>Order ID that we sended to your in your email address.</span>
            </div>

            <button className="h-12 px-8 bg-orange-500 text-white text-sm font-semibold uppercase flex items-center gap-3 hover:bg-orange-600">
              Track Order
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}