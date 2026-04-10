import { FiTruck, FiHeadphones, FiShield, FiTag } from "react-icons/fi";

const features = [
  { icon: FiTruck, title: "Fast Delivery", desc: "Start from $10" },
  { icon: FiHeadphones, title: "24/7 Assistance", desc: "Anytime support" },
  { icon: FiShield, title: "Secure Payment", desc: "100% protected" },
  { icon: FiTag, title: "Best Prices", desc: "Guaranteed offers" },
];

export default function FeatureStrips() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-lg hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-dark text-sm">
                  {feature.title}
                </h4>
                <p className="text-dark-300 text-xs">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
