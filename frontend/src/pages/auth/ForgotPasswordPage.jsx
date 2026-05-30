import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";
import { authService } from "../../services/authService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await authService.requestPasswordReset(email);
      setMessage(result.message || "Reset code sent");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not send reset code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout
      title="Forgot Password"
      subtitle="Enter the email connected to your account and we will send a reset link."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Forgot Password" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-500">
            We will send you instructions to recover your account.
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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/signin" className="font-medium text-sky-600 hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
