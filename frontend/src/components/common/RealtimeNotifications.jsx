import { useEffect, useState, useCallback } from "react";
import { Bell, X } from "lucide-react";
import { connectSocket } from "../../services/socket";

// Dëgjon njoftime live përmes Socket.IO dhe i shfaq si toast në UI
export default function RealtimeNotifications() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((n) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, ...n }]);
    // hiqe vetvetiu pas 6 sekondash
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  }, []);

  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  useEffect(() => {
    const setup = () => {
      const socket = connectSocket();
      if (!socket) return;
      socket.off("notification");
      socket.on("notification", (n) => addToast(n));
    };

    setup();
    // rilidhu pas login/logout
    window.addEventListener("auth-changed", setup);
    return () => window.removeEventListener("auth-changed", setup);
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[90vw]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex items-start gap-3 animate-[slideIn_0.2s_ease-out]"
        >
          <div className="bg-primary/10 text-primary rounded-full p-2 flex-shrink-0">
            <Bell size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-dark mb-0.5">
              {t.title || "Njoftim"}
            </h4>
            {t.message && (
              <p className="text-xs text-dark-300 leading-snug">{t.message}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-dark-300 hover:text-dark flex-shrink-0"
            aria-label="Mbyll"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
