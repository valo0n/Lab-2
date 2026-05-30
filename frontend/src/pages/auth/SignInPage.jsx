import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";
import { authService } from "../../services/authService";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await authService.login(email, password);
      if (result.success) {
        if (!rememberMe) {
          localStorage.setItem("authPreference", "session");
        }
        navigate("/dashboard");
      }
    } catch (err) {
      const apiMessage = err.response?.data?.message || "Sign in failed";
      setError(apiMessage);
      if (apiMessage.toLowerCase().includes("verify")) {
        localStorage.setItem("pendingVerificationEmail", email);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout
      title="Sign In"
      subtitle="Access your account to continue shopping and track your orders."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Sign In" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="bg-sky-600 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">Welcome back</p>
            <h2 className="mt-3 text-3xl font-semibold">Your CLICON account</h2>
            <p className="mt-4 text-sm leading-6 text-sky-100">
              Sign in to view your cart, wishlist, saved addresses, and previous orders.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-sky-50">
              <li>Fast checkout with saved details</li>
              <li>Track order and delivery updates</li>
              <li>Exclusive member discounts</li>
            </ul>
          </div>

          <div className="p-8 sm:p-10">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {message && (
                <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {message}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-xs font-medium text-sky-600 hover:underline"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-medium text-sky-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-5 text-sm text-gray-600">
              New here?{" "}
              <Link to="/signup" className="font-medium text-sky-600 hover:underline">
                Create an account
              </Link>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Need verification?{" "}
              <Link to="/email-verification" className="font-medium text-sky-600 hover:underline">
                Verify email
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
