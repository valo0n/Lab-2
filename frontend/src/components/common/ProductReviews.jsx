import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Lista e review-ve të aprovuara + formular për të lënë review (kërkon login)
export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reviews/product/${productId}`);
      const data = await res.json().catch(() => ({}));
      setReviews(data?.data || []);
    } catch (_) {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submit = async () => {
    if (!token) {
      setMessage("Duhet të jesh i loguar për të lënë review.");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, rating, comment }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setComment("");
        setRating(5);
        setMessage(
          "Review-i u dërgua! Do të shfaqet pasi të aprovohet nga administratori.",
        );
      } else {
        setMessage(data.message || "Review-i nuk u dërgua.");
      }
    } catch (_) {
      setMessage("Review-i nuk u dërgua.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Lista e review-ve */}
      <div>
        <h3 className="mb-4 text-base font-semibold text-gray-900">
          Review-et e klientëve ({reviews.length})
        </h3>
        {loading ? (
          <p className="text-sm text-gray-500">Duke ngarkuar...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            Ende s'ka review për këtë produkt. Bëhu i pari!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {r.user
                      ? `${r.user.first_name} ${r.user.last_name}`
                      : "Klient"}
                  </p>
                  <span className="inline-flex items-center gap-1 text-amber-500 text-sm font-bold">
                    <Star size={14} fill="currentColor" /> {r.rating}
                  </span>
                </div>
                {r.comment && (
                  <p className="text-sm leading-6 text-gray-600">{r.comment}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formulari */}
      <div>
        <h3 className="mb-4 text-base font-semibold text-gray-900">
          Lër një review
        </h3>
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Vlerësimi yt</p>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                className="text-amber-400"
              >
                <Star
                  size={22}
                  fill={(hover || rating) >= s ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Shkruaj përshtypjet për produktin..."
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500 mb-3"
          />
          <button
            onClick={submit}
            disabled={submitting}
            className="bg-orange-500 text-white text-sm font-bold uppercase px-5 py-2.5 rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {submitting ? "Duke dërguar..." : "Dërgo review"}
          </button>
          {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
}
