import { useState } from "react";
import { X, Star } from "lucide-react";

export default function RatingModal({ isOpen, onClose, orderId }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [isOpen2, setIsOpen2] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Review submitted:", { orderId, rating, feedback });
    onClose();
    setFeedback("");
    setRating(5);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-dark-300 tracking-wider">
            LEAVE A RATING
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-dark-300 hover:text-dark"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm text-dark mb-2 block">Rating</label>
          <div
            className="border border-gray-200 rounded px-3 py-2.5 flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen2(!isOpen2)}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={16}
                    className={
                      n <= rating
                        ? "fill-warning text-warning"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-dark">{rating} Star Rating</span>
            </div>
            <span className="text-dark-300">▾</span>
          </div>
          {isOpen2 && (
            <div className="border border-gray-200 rounded mt-1 bg-white shadow-lg">
              {[5, 4, 3, 2, 1].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setRating(n);
                    setIsOpen2(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left text-sm"
                >
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={
                          s <= n ? "fill-warning text-warning" : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  {n} Star Rating
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="text-sm text-dark mb-2 block">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write down your feedback about our product & services"
            rows={4}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary-600 text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wide transition-colors"
        >
          Publish Review
        </button>
      </div>
    </div>
  );
}
