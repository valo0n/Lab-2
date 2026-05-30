import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";
import { authService } from "../../services/authService";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,128}$/.test(password)) {
      setError("Password must include uppercase, lowercase, and a number");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms to continue");
      return;
    }

    setLoading(true);
    try {
      const result = await authService.register({
        first_name: trimmedFirstName,
        last_name: trimmedLastName,
        email: trimmedEmail,
        password,
      });
      if (result.success) {
        navigate("/email-verification", { state: { email: trimmedEmail } });
      }
    } catch (err) {
      const firstValidationError = err.response?.data?.errors?.[0]?.message;
      setError(firstValidationError || err.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout
      title="Sign Up"
      subtitle="Create a free account and manage your orders from one place."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "Sign Up" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            {error && <div className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="sm:col-span-2">
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
              <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create password"
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

            <label className="sm:col-span-2 flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300"
              />
              I agree to the Terms of Service and Privacy Policy.
            </label>

            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-2 rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-sky-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
