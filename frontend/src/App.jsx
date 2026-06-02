import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Home
import HomePage from "./pages/home/HomePage";

// Shop
import ShopPage from "./pages/shop/ShopPage";
import ProductDetailsPage from "./pages/shop/ProductDetailsPage";
import ComparePage from "./pages/shop/ComparePage";

// Cart & Checkout
import ShoppingCartPage from "./pages/cart/ShoppingCartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";

// Auth
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import EmailVerificationPage from "./pages/auth/EmailVerificationPage";

// Account
import DashboardPage from "./pages/account/DashboardPage";
import CustomerPage from "./pages/account/CustomerPage";
import WishlistPage from "./pages/account/WishlistPage";
import TrackOrderPage from "./pages/account/TrackOrderPage";
import TrackOrderDetails from "./pages/account/TrackOrderDetails";
import OrderHistoryPage from "./pages/account/OrderHistoryPage";
import OrderDetailsPage from "./pages/account/OrderDetailsPage";
import CardsAddressPage from "./pages/account/CardsAddressPage";
import BrowsingHistoryPage from "./pages/account/BrowsingHistoryPage";
import SettingsPage from "./pages/account/SettingsPage";

// Info
import AboutUsPage from "./pages/info/AboutUsPage";
import BlogPage from "./pages/info/BlogPage";
import FAQsPage from "./pages/info/FAQsPage";
import BlogDetailPage from "./pages/info/BlogDetailPage";

// Order
import SuccessPage from "./pages/order/SuccessPage";

// 404
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />
            {/* Shop */}
            <Route path="/shop-page" element={<ShopPage />} />
            <Route
              path="/products/:slug"
              element={<ProductDetailsPage />}
            />{" "}
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
            <Route path="/browsing-history" element={<BrowsingHistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
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
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
