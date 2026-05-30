import api from "./api";

const setSession = (data) => {
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.success) {
      setSession(response.data.data);
    }
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    if (response.data.success) {
      setSession(response.data.data);
      localStorage.setItem("pendingVerificationEmail", email);
    }
    return response.data;
  },

  sendVerificationCode: async (email) => {
    const response = await api.post("/auth/send-verification-code", { email });
    return response.data;
  },

  verifyEmail: async (email, code) => {
    const response = await api.post("/auth/verify-email", { email, code });
    if (response.data.success) {
      localStorage.removeItem("pendingVerificationEmail");
    }
    return response.data;
  },

  requestPasswordReset: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    if (response.data.success) {
      localStorage.setItem("resetPasswordEmail", email);
    }
    return response.data;
  },

  resetPassword: async (email, code, password) => {
    const response = await api.post("/auth/reset-password", {
      email,
      code,
      password,
    });
    if (response.data.success) {
      localStorage.removeItem("resetPasswordEmail");
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("pendingVerificationEmail");
    localStorage.removeItem("resetPasswordEmail");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getPendingVerificationEmail: () => localStorage.getItem("pendingVerificationEmail") || "",

  getResetPasswordEmail: () => localStorage.getItem("resetPasswordEmail") || "",

  isLoggedIn: () => {
    return !!localStorage.getItem("token");
  },
};
