import SiteLayout from "../../components/common/SiteLayout";

const stats = [
  { label: "Active Customers", value: "150K+" },
  { label: "Orders Delivered", value: "2.3M" },
  { label: "Product Categories", value: "280+" },
  { label: "Support Satisfaction", value: "98%" },
];

export default function AboutUsPage() {
  return (
    <SiteLayout
      title="About Us"
      subtitle="Building a faster, safer, and smarter online shopping experience."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "About Us" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">Our story</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900">Technology meets trusted service</h2>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              CLICON started with one goal: make high-quality electronics more accessible. Today we serve customers across regions with transparent pricing, reliable logistics, and support that actually helps.
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              From laptops and phones to smart home devices, we focus on curated products, secure payments, and fast delivery.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-sky-600 to-sky-500 p-8 text-white shadow-sm">
            <h3 className="text-xl font-semibold">Why customers choose us</h3>
            <ul className="mt-5 space-y-3 text-sm text-sky-50">
              <li>Verified products from trusted brands</li>
              <li>Fast, trackable shipping options</li>
              <li>Simple returns and exchange process</li>
              <li>Always-on customer support channels</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
