import { Link } from "react-router-dom";
import SiteLayout from "../components/common/SiteLayout";

export default function ResetPasswordPage() {
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

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Verification Code</label>
              <input
                type="text"
                placeholder="Enter code from email"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="New password"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              Update Password
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
