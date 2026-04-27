import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Order History", icon: "📦" },
    { name: "Track Order", icon: "📍" },
    { name: "Shopping Cart", icon: "🛒" },
    { name: "Wishlist", icon: "❤️" },
    { name: "Compare", icon: "🔄" },
    { name: "Cards & Address", icon: "💳" },
    { name: "Browsing History", icon: "🕒" },
    { name: "Setting", icon: "⚙️" },
    { name: "Log-out", icon: "🚪" },
  ];

  const recentOrders = [
    { id: "#96459761", status: "IN PROGRESS", date: "Dec 30, 2019", total: "$1,500 (5 Products)" },
    { id: "#71667167", status: "COMPLETED", date: "Feb 2, 2019", total: "$80 (11 Products)" },
    { id: "#95214362", status: "CANCELED", date: "Mar 20, 2019", total: "$160 (3 Products)" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <TopBar />
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-fit">
            <nav className="flex flex-col">
              {sidebarItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === item.name 
                      ? "bg-orange-500 text-white" 
                      : "text-gray-600 hover:bg-orange-50"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <section className="flex-1">
            <header className="mb-6">
              <h1 className="text-xl font-bold">Hello, Kevin</h1>
              <p className="text-gray-500 text-sm">
                From your account dashboard you can easily check & view your recent orders, 
                manage your shipping and billing addresses and edit your password.
              </p>
            </header>

            {/* Account Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              {/* Profile */}
              <div className="p-5 bg-white border border-gray-200 rounded-lg flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-3 overflow-hidden">
                   <img src="https://via.placeholder.com/150" alt="Avatar" />
                </div>
                <h3 className="font-bold">Kevin Gilbert</h3>
                <p className="text-xs text-gray-500">Dhaka - 1207, Bangladesh</p>
                <button className="mt-4 text-sm text-blue-600 font-semibold uppercase">Edit Account</button>
              </div>

              {/* Billing Address */}
              <div className="p-5 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-xs font-bold uppercase text-gray-400 mb-2">Billing Address</h3>
                <p className="text-sm font-bold">Kevin Gilbert</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  East Tejturi Bazar, Word No. 04, Road No. 13/x, Dhaka - 1200
                </p>
                <button className="mt-4 text-sm text-blue-600 font-semibold uppercase">Edit Address</button>
              </div>

              {/* Stats */}
              <div className="grid grid-rows-3 gap-2">
                <div className="bg-blue-50 p-3 rounded flex items-center justify-between">
                   <span className="text-sm font-medium">Total Orders</span>
                   <span className="font-bold">154</span>
                </div>
                <div className="bg-orange-50 p-3 rounded flex items-center justify-between">
                   <span className="text-sm font-medium">Pending Orders</span>
                   <span className="font-bold">05</span>
                </div>
                <div className="bg-green-50 p-3 rounded flex items-center justify-between">
                   <span className="text-sm font-medium">Completed Orders</span>
                   <span className="font-bold">149</span>
                </div>
              </div>
            </div>

            {/* Payment Options (Cards) */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">Payment Option</h2>
                <button className="text-sm text-blue-600 font-medium">Add Card +</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden">
                  <p className="text-xs opacity-70 mb-1">CARD NUMBER</p>
                  <p className="tracking-widest font-mono">**** **** **** 3814</p>
                  <div className="mt-6 flex justify-between items-end">
                    <span className="font-bold italic">VISA</span>
                    <span className="text-sm">Kevin Gilbert</span>
                  </div>
                </div>
                <div className="bg-green-700 text-white p-6 rounded-xl">
                  <p className="text-xs opacity-70 mb-1">CARD NUMBER</p>
                  <p className="tracking-widest font-mono">**** **** **** 1761</p>
                  <div className="mt-6 flex justify-between items-end">
                    <span className="font-bold italic">MasterCard</span>
                    <span className="text-sm">Kevin Gilbert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between">
                <h2 className="font-bold">Recent Order</h2>
                <button className="text-sm text-orange-500 font-medium">View All →</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className={`px-6 py-4 font-bold text-xs ${
                        order.status === 'COMPLETED' ? 'text-green-500' : 
                        order.status === 'CANCELED' ? 'text-red-500' : 'text-orange-500'
                      }`}>
                        {order.status}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 text-gray-500">{order.total}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 font-bold">View Details →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}