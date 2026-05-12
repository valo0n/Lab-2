import { Link } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";

export default function ForgotPasswordPage() {
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

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              Send Reset Link
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
