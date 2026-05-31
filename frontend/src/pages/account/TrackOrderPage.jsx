import { useState } from "react";
import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import {
  Home,
  Info,
  ArrowRight,
  Package,
  Truck,
  CheckCircle2,
  FileText,
} from "lucide-react";
import api from "../../services/api";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = async () => {
    setError("");
    setOrder(null);

    if (!orderId.trim()) {
      setError("Ju lutem shkruani Order ID");
      return;
    }

    try {
      setLoading(true);
      const cleanId = orderId.replace("#", "").trim();
      const res = await api.get(`/orders/track/${cleanId}`);
      if (res.data.success) {
        setOrder(res.data.data);
      } else {
        setError("Porosia s'u gjet.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Porosia s'u gjet. Kontrolloni Order ID.",
      );
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { label: "Order Placed", icon: FileText },
    { label: "Packaging", icon: Package },
    { label: "On The Road", icon: Truck },
    { label: "Delivered", icon: CheckCircle2 },
  ];

  const getCurrentStep = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "pending") return 0;
    if (s === "processing") return 1;
    if (s === "shipped") return 2;
    if (s === "delivered" || s === "completed") return 3;
    return 0;
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
          <span>Pages</span>
          <span>{">"}</span>
          <span className="text-blue-500">Track Order</span>
        </div>
      </div>

      <main className="bg-white min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 pt-14 pb-14">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold text-gray-900 mb-5">
              Track Order
            </h1>
            <p className="text-sm text-gray-500 leading-6 mb-6 max-w-xl">
              To track your order please enter your order ID in the input field
              below and press the "Track Order" button. this was given to you on
              your receipt and in the confirmation email you should have
              received.
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="ID..."
                  className="w-full h-11 border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Billing Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-11 border border-gray-200 px-4 text-sm text-gray-900 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Info size={16} />
              <span>
                Order ID that we sended to your in your email address.
              </span>
            </div>

            <button
              type="button"
              onClick={handleTrack}
              disabled={loading}
              className="h-12 px-8 bg-orange-500 text-white text-sm font-semibold uppercase flex items-center gap-3 hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Duke kerkuar..." : "Track Order"}
              <ArrowRight size={18} />
            </button>

            {/* Rezultati i tracking */}
            {order && (
              <div className="mt-10 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      #{order.order_number}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {order.items?.length || 0} Products • Total: $
                      {parseFloat(order.total).toFixed(2)}
                    </p>
                  </div>
                  <span className="bg-orange-50 text-orange-500 text-xs font-bold px-3 py-1.5 rounded uppercase">
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {steps.map((step, i) => {
                    const Icon = step.icon;
                    const currentStep = getCurrentStep(order.status);
                    const isDone = i <= currentStep;
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center text-center"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            isDone
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-300"
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <p
                          className={`text-xs font-medium ${isDone ? "text-gray-900" : "text-gray-300"}`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {order.tracking_number && (
                  <div className="mt-6 pt-4 border-t border-gray-100 text-sm">
                    <p className="text-gray-500">
                      Tracking Number:{" "}
                      <span className="text-gray-900 font-semibold">
                        {order.tracking_number}
                      </span>
                    </p>
                    {order.carrier && (
                      <p className="text-gray-500 mt-1">
                        Carrier:{" "}
                        <span className="text-gray-900 font-semibold">
                          {order.carrier}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
