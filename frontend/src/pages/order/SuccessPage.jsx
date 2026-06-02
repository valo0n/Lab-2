import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { Check, Layers, ArrowRight, Home } from "lucide-react";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Merr orderNumber nga state (e dergon CheckoutPage pas Place Order)
  const orderNumber =
    location.state?.orderNumber || location.state?.order?.order_number || "";

  const handleViewOrder = () => {
    if (orderNumber) {
      navigate(`/order-details?id=${orderNumber}`);
    } else {
      // Nese s'ka numer, ço te lista e porosive
      navigate("/order-history");
    }
  };

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
          <span>Shopping Card</span>
          <span>{">"}</span>
          <span className="text-orange-500">Checkout</span>
        </div>
      </div>

      <main className="bg-white min-h-[520px] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-green-100 border-[3px] border-green-500 flex items-center justify-center">
            <Check size={36} className="text-green-600" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Your order is successfully placed
          </h1>

          {orderNumber && (
            <p className="text-sm text-gray-700 mb-2">
              Order Number:{" "}
              <span className="font-bold text-orange-500">#{orderNumber}</span>
            </p>
          )}

          <p className="text-sm text-gray-500 leading-6 mb-8">
            Faleminderit per porosine! Mund ta ndiqni statusin e porosise tek
            "View Order" ose te shkoni tek paneli juaj.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="h-12 px-6 border border-orange-300 text-orange-500 text-sm font-semibold uppercase flex items-center gap-2 hover:bg-orange-50"
            >
              <Layers size={17} />
              Go to Dashboard
            </button>

            <button
              onClick={handleViewOrder}
              className="h-12 px-7 bg-orange-500 text-white text-sm font-semibold uppercase flex items-center gap-2 hover:bg-orange-600"
            >
              View Order
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
