import { Link } from "react-router-dom";
import { authService } from "../../services/authService";

export default function AdminDashboard() {
  const user = authService.getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg text-center">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-primary text-2xl font-bold">A</span>
        </div>
        <h1 className="text-2xl font-bold text-dark mb-2">Admin Dashboard</h1>
        <p className="text-dark-300 mb-1">
          Mirë se erdhe, {user?.name || "Admin"}!
        </p>
        <p className="text-sm text-dark-300 mb-6">
          Roli:{" "}
          <span className="text-primary font-semibold">
            {user?.roles?.join(", ") || "admin"}
          </span>
        </p>
        <p className="text-xs text-dark-300 mb-6 leading-relaxed">
          Këtu do vijë admin paneli (menaxhimi i produkteve, porosive,
          përdoruesve dhe statistikat). Aktualisht në ndërtim.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="bg-primary text-white text-xs font-bold uppercase px-5 py-2.5 rounded hover:bg-primary-600 transition-colors"
          >
            Shko te Faqja
          </Link>
          <button
            onClick={() => {
              authService.logout();
              window.location.href = "/";
            }}
            className="border border-danger text-danger text-xs font-bold uppercase px-5 py-2.5 rounded hover:bg-danger hover:text-white transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
