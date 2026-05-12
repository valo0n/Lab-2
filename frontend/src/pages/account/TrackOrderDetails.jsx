import TopBar from "../../components/layout/TopBar";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import {
  Home,
  Check,
  Package,
  Truck,
  Handshake,
  ClipboardList,
  User,
  MapPin,
  Map,
  CircleCheck,
  CalendarDays,
} from "lucide-react";

export default function TrackOrderDetails() {
  const activities = [
    {
      icon: Check,
      color: "green",
      title: "Your order has been delivered. Thank you for shopping at Clicon!",
      date: "23 Jan, 2021 at 7:32 PM",
    },
    {
      icon: User,
      color: "blue",
      title: "Our delivery man (John Wick) Has picked-up your order for delivery.",
      date: "23 Jan, 2021 at 2:00 PM",
    },
    {
      icon: MapPin,
      color: "blue",
      title: "Your order has reached at last mile hub.",
      date: "22 Jan, 2021 at 8:00 AM",
    },
    {
      icon: Map,
      color: "blue",
      title: "Your order on the way to (last mile) hub.",
      date: "21, 2021 at 5:32 AM",
    },
    {
      icon: CircleCheck,
      color: "green",
      title: "Your order is successfully verified.",
      date: "20 Jan, 2021 at 7:32 PM",
    },
    {
      icon: CalendarDays,
      color: "blue",
      title: "Your order has been confirmed.",
      date: "19 Jan, 2021 at 2:61 PM",
    },
  ];

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
          <span>Track Order</span>
          <span>{">"}</span>
          <span className="text-blue-500">Details</span>
        </div>
      </div>

      <main className="bg-white py-14">
        <div className="max-w-3xl mx-auto border border-gray-200 rounded-sm bg-white">
          <div className="p-6 border-b border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl text-gray-900 mb-2">#96459761</h2>
                <p className="text-sm text-gray-600">
                  4 Products <span className="mx-2">•</span> Order Placed in 17
                  Jan, 2021 at 7:32 PM
                </p>
              </div>

              <div className="text-2xl font-semibold text-blue-500">
                $1199.00
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-6 mb-8">
              Order expected arrival{" "}
              <span className="font-semibold text-gray-900">23 Jan, 2021</span>
            </p>

            <div className="px-20">
              <div className="relative h-10">
                <div className="absolute top-4 left-0 right-0 h-1 bg-orange-100" />
                <div className="absolute top-4 left-0 w-[33%] h-1 bg-orange-500" />

                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <Check size={16} />
                </div>
                <div className="absolute left-1/3 -translate-x-1/2 top-1 w-6 h-6 rounded-full bg-orange-500 border-4 border-white" />
                <div className="absolute left-2/3 -translate-x-1/2 top-1 w-6 h-6 rounded-full bg-white border-2 border-orange-500" />
                <div className="absolute right-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-orange-500" />
              </div>

              <div className="grid grid-cols-4 text-center mt-4">
                <div>
                  <ClipboardList className="mx-auto text-green-500 mb-3" />
                  <p className="text-sm text-gray-900">Order Placed</p>
                </div>
                <div>
                  <Package className="mx-auto text-orange-500 mb-3" />
                  <p className="text-sm text-gray-900">Packaging</p>
                </div>
                <div>
                  <Truck className="mx-auto text-orange-300 mb-3" />
                  <p className="text-sm text-gray-400">On The Road</p>
                </div>
                <div>
                  <Handshake className="mx-auto text-orange-300 mb-3" />
                  <p className="text-sm text-gray-400">Delivered</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-5">
              Order Activity
            </h3>

            <div className="space-y-4">
              {activities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={index} className="flex gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-sm ${
                        item.color === "green"
                          ? "bg-green-100 text-green-500"
                          : "bg-blue-100 text-blue-500"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}