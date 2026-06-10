import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true, // dërgon cookie-t httpOnly (refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request — shton access token-in nga localStorage nëse ka
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response — nëse access token-i ka skaduar (401), provo një refresh me cookie-n
// httpOnly dhe ripërsërit kërkesën një herë.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const isAuthCall =
      original?.url?.includes("/auth/refresh") ||
      original?.url?.includes("/auth/login") ||
      original?.url?.includes("/auth/register");

    if (status === 401 && original && !original._retry && !isAuthCall) {
      original._retry = true;
      try {
        const res = await api.post("/auth/refresh");
        const newToken = res.data?.data?.token;
        if (newToken) {
          sessionStorage.setItem("token", newToken);
          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        }
      } catch (e) {
        // Refresh dështoi → seanca mbaroi
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        if (window.location.pathname !== "/signin") {
          window.location.href = "/signin";
        }
      }
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
