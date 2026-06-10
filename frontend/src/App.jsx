import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import RealtimeNotifications from "./components/common/RealtimeNotifications";

// Faqet ngarkohen me lazy loading — çdo faqe vjen vetëm kur shkon te ajo (code splitting)
// Home
const HomePage = lazy(() => import("./pages/home/HomePage"));

// Shop
const ShopPage = lazy(() => import("./pages/shop/ShopPage"));
const ProductDetailsPage = lazy(
  () => import("./pages/shop/ProductDetailsPage"),
);
const ComparePage = lazy(() => import("./pages/shop/ComparePage"));

// Cart & Checkout
const ShoppingCartPage = lazy(() => import("./pages/cart/ShoppingCartPage"));
const CheckoutPage = lazy(() => import("./pages/cart/CheckoutPage"));

// Auth
const SignInPage = lazy(() => import("./pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const ForgotPasswordPage = lazy(
  () => import("./pages/auth/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const EmailVerificationPage = lazy(
  () => import("./pages/auth/EmailVerificationPage"),
);

// Account
const DashboardPage = lazy(() => import("./pages/account/DashboardPage"));
const CustomerPage = lazy(() => import("./pages/account/CustomerPage"));
const WishlistPage = lazy(() => import("./pages/account/WishlistPage"));
const TrackOrderPage = lazy(() => import("./pages/account/TrackOrderPage"));
const TrackOrderDetails = lazy(
  () => import("./pages/account/TrackOrderDetails"),
);
const OrderHistoryPage = lazy(() => import("./pages/account/OrderHistoryPage"));
const OrderDetailsPage = lazy(() => import("./pages/account/OrderDetailsPage"));
const CardsAddressPage = lazy(() => import("./pages/account/CardsAddressPage"));
const BrowsingHistoryPage = lazy(
  () => import("./pages/account/BrowsingHistoryPage"),
);
const SettingsPage = lazy(() => import("./pages/account/SettingsPage"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminBrands = lazy(() => import("./pages/admin/AdminBrands"));
const AdminCoupons = lazy(() => import("./pages/admin/AdminCoupons"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminPlaceholder = lazy(() => import("./pages/admin/AdminPlaceholder"));
import RoleRoute from "./pages/admin/RoleRoute";

// Info
const AboutUsPage = lazy(() => import("./pages/info/AboutUsPage"));
const BlogPage = lazy(() => import("./pages/info/BlogPage"));
const FAQsPage = lazy(() => import("./pages/info/FAQsPage"));
const BlogDetailPage = lazy(() => import("./pages/info/BlogDetailPage"));

// Order
const SuccessPage = lazy(() => import("./pages/order/SuccessPage"));

// 404
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Fallback gjatë ngarkimit të një faqeje
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-primary animate-spin" />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              {/* Shop */}
              <Route path="/shop-page" element={<ShopPage />} />
              <Route path="/products/:slug" element={<ProductDetailsPage />} />
              <Route path="/compare" element={<ComparePage />} />
              {/* Cart & Checkout */}
              <Route path="/cart" element={<ShoppingCartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* Auth */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route
                path="/email-verification"
                element={<EmailVerificationPage />}
              />
              {/* Account */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route
                path="/track-order-details"
                element={<TrackOrderDetails />}
              />
              <Route path="/order-history" element={<OrderHistoryPage />} />
              <Route path="/order-details" element={<OrderDetailsPage />} />
              <Route path="/cards-address" element={<CardsAddressPage />} />
              <Route
                path="/browsing-history"
                element={<BrowsingHistoryPage />}
              />
              <Route path="/settings" element={<SettingsPage />} />
              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <RoleRoute>
                    <AdminDashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <RoleRoute allowedRoles={["admin", "manager", "support"]}>
                    <AdminOrders />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <RoleRoute allowedRoles={["admin", "manager", "editor"]}>
                    <AdminProducts />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <RoleRoute allowedRoles={["admin", "manager", "editor"]}>
                    <AdminCategories />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/brands"
                element={
                  <RoleRoute allowedRoles={["admin", "manager", "editor"]}>
                    <AdminBrands />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RoleRoute allowedRoles={["admin"]}>
                    <AdminUsers />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/coupons"
                element={
                  <RoleRoute allowedRoles={["admin", "manager"]}>
                    <AdminCoupons />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/reviews"
                element={
                  <RoleRoute allowedRoles={["admin", "manager", "support"]}>
                    <AdminReviews />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <RoleRoute allowedRoles={["admin"]}>
                    <AdminSettings />
                  </RoleRoute>
                }
              />
              {/* Info */}
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/blog-detail" element={<BlogDetailPage />} />
              {/* Order */}
              <Route path="/success" element={<SuccessPage />} />
              {/* 404 */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <RealtimeNotifications />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
