import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";
import { authService } from "../../services/authService";

export default function EmailVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const initialEmail = location.state?.email || authService.getPendingVerificationEmail();
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [location.state]);

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setCodeDigits((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = codeDigits.join("");
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await authService.verifyEmail(email, code);
      if (result.success) {
        setMessage(result.message || "Email verified successfully");
        navigate(authService.isLoggedIn() ? "/dashboard" : "/signin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const result = await authService.sendVerificationCode(email);
      setMessage(result.message || "Verification code sent again");
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout
      title="Email Verification"
      subtitle="Verify your email to activate all account features."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Email Verification" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-2xl">✉</div>
          <h2 className="mt-5 text-2xl font-semibold text-gray-900">Check your inbox</h2>
          <p className="mt-2 text-sm text-gray-500">We sent a 6-digit verification code to your email address.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
            {message && <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 text-left">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="mt-2 flex justify-center gap-2 sm:gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                maxLength={1}
                value={codeDigits[index]}
                onChange={(event) => handleDigitChange(index, event.target.value)}
                onPaste={(event) => {
                  const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
                  if (digits.length) {
                    setCodeDigits(["", "", "", "", "", ""]);
                    setCodeDigits(digits.concat(Array(6 - digits.length).fill("")));
                  }
                }}
                className="h-12 w-10 rounded-md border border-gray-300 text-center text-lg font-semibold outline-none transition focus:border-sky-500 sm:w-12"
              />
            ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Did not get the email?{" "}
            <button type="button" onClick={handleResend} className="font-medium text-sky-600 hover:underline">
              Resend code
            </button>
          </p>

          <p className="mt-2 text-sm text-gray-600">
            <Link to="/signin" className="font-medium text-sky-600 hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
