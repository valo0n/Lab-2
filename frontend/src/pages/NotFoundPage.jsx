import { Link } from "react-router-dom";
import SiteLayout from "../components/common/SiteLayout";

export default function NotFoundPage() {
  return (
    <SiteLayout
      title="404 Error"
      subtitle="The page you are looking for does not exist or was moved."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "404" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-7xl font-bold tracking-tight text-orange-500">404</p>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">Page Not Found</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
          The link might be broken or the page may have been removed. Try navigating back to home.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
          >
            Go to Home
          </Link>
          <Link
            to="/faqs"
            className="rounded-md border border-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-sky-600 transition hover:bg-sky-50"
          >
            Visit FAQs
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
