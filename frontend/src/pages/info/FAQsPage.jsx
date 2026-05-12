import SiteLayout from "../../components/common/SiteLayout";

const faqItems = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping usually takes 3 to 5 business days, while express options can arrive within 1 to 2 business days.",
  },
  {
    question: "Can I return a product after delivery?",
    answer:
      "Yes. Most products can be returned within 30 days in original condition. Go to your account orders section to start a return.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After your order ships, tracking details will appear in your customer dashboard and in your email confirmation.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support debit and credit cards, PayPal, Stripe, and selected local payment methods depending on your region.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Use the customer support section from your dashboard or call our support number shown in the footer.",
  },
];

export default function FAQsPage() {
  return (
    <SiteLayout
      title="Frequently Asked Questions"
      subtitle="Quick answers about orders, shipping, returns, and account settings."
      breadcrumb={[
        { label: "Home", to: "/" },
        { label: "FAQs" },
      ]}
    >
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm open:border-sky-200"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-gray-900">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
