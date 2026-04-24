import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../Layout/TopBar";
import Header from "../Layout/Header";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";

export default function SiteLayout({ title, subtitle, children, breadcrumb = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen((v) => !v);
    setWishlistOpen(false);
    setAccountOpen(false);
  };

  const toggleWishlist = () => {
    setWishlistOpen((v) => !v);
    setCartOpen(false);
    setAccountOpen(false);
  };

  const toggleAccount = () => {
    setAccountOpen((v) => !v);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <TopBar />
      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
        cartOpen={cartOpen}
        onCartToggle={toggleCart}
        wishlistOpen={wishlistOpen}
        onWishlistToggle={toggleWishlist}
        accountOpen={accountOpen}
        onAccountToggle={toggleAccount}
      />
      <Navigation
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {(title || breadcrumb.length > 0) && (
        <section className="border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            {breadcrumb.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                {breadcrumb.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {item.to ? (
                      <Link to={item.to} className="transition hover:text-sky-600">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-sky-600">{item.label}</span>
                    )}
                    {index < breadcrumb.length - 1 && <span>/</span>}
                  </div>
                ))}
              </div>
            )}

            {title && <h1 className="mt-3 text-3xl font-semibold text-gray-900">{title}</h1>}
            {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
          </div>
        </section>
      )}

      <main>{children}</main>

      <Footer />
    </div>
  );
}
