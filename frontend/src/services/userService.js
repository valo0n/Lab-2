import api from "./api";

export const userService = {
  getDashboard: async () => {
    const response = await api.get("/users/dashboard");
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },
};
