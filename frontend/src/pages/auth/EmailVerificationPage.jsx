import { Link } from "react-router-dom";
import SiteLayout from "../../components/common/SiteLayout";

export default function EmailVerificationPage() {
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
          <p className="mt-2 text-sm text-gray-500">
            We sent a 6-digit verification code to your email address.
          </p>

          <div className="mt-6 flex justify-center gap-2 sm:gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                maxLength={1}
                className="h-12 w-10 rounded-md border border-gray-300 text-center text-lg font-semibold outline-none transition focus:border-sky-500 sm:w-12"
              />
            ))}
          </div>

          <button
            type="button"
            className="mt-6 rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
          >
            Verify Email
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Did not get the email?{" "}
            <button type="button" className="font-medium text-sky-600 hover:underline">
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
