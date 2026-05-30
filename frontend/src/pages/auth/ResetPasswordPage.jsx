import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";
import { authService } from "../../services/authService";

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const initialEmail = location.state?.email || authService.getResetPasswordEmail();
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await authService.resetPassword(email, code, password);
      setMessage(result.message || "Password updated successfully");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout
      title="Reset Password"
      subtitle="Set a strong password and secure your account."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Reset Password" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900">Create a new password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Use at least 8 characters with a mix of letters and numbers.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
            {message && <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
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
              <label className="mb-2 block text-sm font-medium text-gray-700">Verification Code</label>
              <input
                type="text"
                placeholder="Enter code from email"
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600">
            Need to try again?{" "}
            <Link to="/forgot-password" className="font-medium text-sky-600 hover:underline">
              Request a new reset link
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
