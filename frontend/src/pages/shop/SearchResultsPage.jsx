import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Package,
  Tags,
  Award,
  Ticket,
  ShoppingBag,
} from "lucide-react";
import TopBar from "../../components/Layout/TopBar";
import Header from "../../components/Layout/Header";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

const imgUrl = (p) => {
  const u = p.images?.[0]?.image_url;
  if (!u) return null;
  return /^https?:/.test(u) ? u : `${SERVER_URL}${u}`;
};

// Kërkim i avancuar — rezultate të grupuara nga 5 lista
export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}/search/all?q=${encodeURIComponent(q)}&limit=8`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.json())
      .then((d) => setData(d.data || null))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [q]);

  const total = data
    ? data.products.length +
      data.categories.length +
      data.brands.length +
      data.coupons.length +
      data.orders.length
    : 0;

  const Section = ({ icon: Icon, title, children, count }) =>
    count > 0 && (
      <section className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
          <Icon size={15} className="text-primary" />
          <h2 className="text-xs font-bold text-dark-300 tracking-wider uppercase">
            {title} ({count})
          </h2>
        </div>
        <div className="p-4">{children}</div>
      </section>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar />
      <Header />
      <Navigation />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Search size={18} className="text-primary" />
          <h1 className="text-lg font-bold text-dark">
            Rezultatet për: <span className="text-primary">"{q}"</span>
          </h1>
        </div>

        {loading ? (
          <p className="text-sm text-dark-300">Duke kërkuar në 5 lista...</p>
        ) : !data || total === 0 ? (
          <p className="text-sm text-dark-300">
            Asnjë rezultat për "{q}". Provo një fjalë tjetër.
          </p>
        ) : (
          <div className="space-y-5">
            <Section
              icon={Package}
              title="Produkte"
              count={data.products.length}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.products.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    className="border border-gray-100 rounded-lg p-3 hover:border-primary transition-colors"
                  >
                    <div className="h-28 flex items-center justify-center mb-2 bg-gray-50 rounded">
                      {imgUrl(p) ? (
                        <img
                          src={imgUrl(p)}
                          alt={p.name}
                          className="max-h-full object-contain"
                        />
                      ) : (
                        <Package size={28} className="text-gray-300" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-dark line-clamp-2">
                      {p.name}
                    </p>
                    <p className="text-sm font-bold text-primary mt-1">
                      ${Number(p.price).toFixed(2)}
                    </p>
                  </Link>
                ))}
              </div>
            </Section>

            <Section
              icon={Tags}
              title="Kategori"
              count={data.categories.length}
            >
              <div className="flex flex-wrap gap-2">
                {data.categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/shop-page?category=${c.id}`}
                    className="text-sm border border-gray-200 rounded-full px-4 py-1.5 text-dark-300 hover:border-primary hover:text-primary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </Section>

            <Section icon={Award} title="Brande" count={data.brands.length}>
              <div className="flex flex-wrap gap-2">
                {data.brands.map((b) => (
                  <Link
                    key={b.id}
                    to={`/shop-page?brand=${b.id}`}
                    className="text-sm border border-gray-200 rounded-full px-4 py-1.5 text-dark-300 hover:border-primary hover:text-primary"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </Section>

            <Section icon={Ticket} title="Kuponë" count={data.coupons.length}>
              <div className="flex flex-wrap gap-3">
                {data.coupons.map((c) => (
                  <div
                    key={c.id}
                    className="border border-dashed border-primary/50 bg-primary/5 rounded px-4 py-2"
                  >
                    <p className="text-sm font-bold text-primary">{c.code}</p>
                    <p className="text-xs text-dark-300">
                      {c.type === "percentage"
                        ? `${Number(c.value)}% zbritje`
                        : `$${Number(c.value)} zbritje`}
                      {Number(c.min_order) > 0 &&
                        ` · min $${Number(c.min_order)}`}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              icon={ShoppingBag}
              title="Porositë e tua"
              count={data.orders.length}
            >
              <div className="divide-y divide-gray-50">
                {data.orders.map((o) => (
                  <Link
                    key={o.id}
                    to={`/order-details/${o.id}`}
                    className="flex items-center justify-between py-2.5 hover:text-primary"
                  >
                    <span className="text-sm font-medium">
                      #{o.order_number}
                    </span>
                    <span className="text-xs uppercase font-bold text-dark-300">
                      {o.status}
                    </span>
                    <span className="text-sm font-bold">
                      ${Number(o.total).toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            </Section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
