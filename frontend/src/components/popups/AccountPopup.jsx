import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authService } from "../../services/authService";

export default function AccountPopup({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const user = authService.getCurrentUser();
  const isLoggedIn = authService.isLoggedIn();
  const isAdmin = authService.isAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authService.login(email, password);
      if (result.success) {
        setEmail("");
        setPassword("");
        onClose();

        // Ndaj sipas rolit: admin -> /admin, user -> /
        const loggedUser = result.data?.user;
        const roles = loggedUser?.roles || [];
        if (roles.includes("admin") || roles.includes("super_admin")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login dështoi, provo përsëri");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    onClose();
    navigate("/");
  };

  // Nëse je i kyçur — shfaq info
  if (isLoggedIn && user) {
    return (
      <>
        <div className="fixed inset-0 z-40" onClick={onClose} />
        <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-dark">{user.name}</h4>
                <p className="text-xs text-dark-300">{user.email}</p>
                {user.roles && (
                  <span className="text-[10px] bg-primary-50 text-primary px-2 py-0.5 rounded font-semibold">
                    {user.roles[0]}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              {/* Vetem admin sheh Admin Dashboard */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="block w-full text-left px-3 py-2 text-sm text-primary font-semibold hover:bg-primary-50 rounded"
                >
                  Admin Dashboard
                </Link>
              )}
              {/* User normal sheh profilin e tij */}
              {!isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="block w-full text-left px-3 py-2 text-sm text-dark hover:bg-gray-50 rounded"
                >
                  My Profile
                </Link>
              )}
              <Link
                to="/order-history"
                onClick={onClose}
                className="block w-full text-left px-3 py-2 text-sm text-dark hover:bg-gray-50 rounded"
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="block w-full text-left px-3 py-2 text-sm text-dark hover:bg-gray-50 rounded"
              >
                Wishlist
              </Link>
              <Link
                to="/settings"
                onClick={onClose}
                className="block w-full text-left px-3 py-2 text-sm text-dark hover:bg-gray-50 rounded"
              >
                Settings
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-3 border border-danger text-danger hover:bg-danger hover:text-white text-xs font-bold py-2.5 rounded transition-colors"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </>
    );
  }

  // Nëse nuk je i kyçur — forma login
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden">
        <div className="p-5">
          <h3 className="text-base font-semibold text-dark text-center mb-4">
            Sign in to your account
          </h3>

          {error && (
            <div className="bg-danger/10 text-danger text-xs p-2.5 rounded mb-3 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-dark-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm text-dark focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-dark-300">Password</label>
                <Link
                  to="/forgot-password"
                  onClick={onClose}
                  className="text-xs text-info hover:underline"
                >
                  Forget Password
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3 pr-10 border border-gray-200 rounded text-sm text-dark focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 hover:text-dark"
                  aria-label="Toggle password"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-600 text-white text-xs font-bold py-2.5 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Duke u kyçur..." : "LOGIN →"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-xs text-dark-300 mb-2">Don't have account</p>
            <Link
              to="/signup"
              onClick={onClose}
              className="block w-full border border-gray-200 text-primary hover:bg-gray-50 text-xs font-bold py-2.5 rounded transition-colors"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
