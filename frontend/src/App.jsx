import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import CustomerPage from "./pages/CustomerPage";
import FAQsPage from "./pages/FAQsPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import AboutUsPage from "./pages/AboutUsPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import SuccessPage from "./pages/SuccessPage";
import TrackOrderDetails from "./pages/TrackOrderDetails";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ComparePage from "./pages/ComparePage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/shop-page" element={<ShopPage />} />
        <Route path="/product-details" element={<ProductDetailsPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/track-order-details" element={<TrackOrderDetails />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
