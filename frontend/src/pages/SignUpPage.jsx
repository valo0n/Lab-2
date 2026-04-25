import { Link } from "react-router-dom";
import SiteLayout from "../components/common/SiteLayout";

export default function SignUpPage() {
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
          <form className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-sky-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create password"
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

            <label className="sm:col-span-2 flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300" />
              I agree to the Terms of Service and Privacy Policy.
            </label>

            <button
              type="button"
              className="sm:col-span-2 rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              Create Account
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
