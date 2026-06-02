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

  // ---- Cards ----
  getCards: async () => {
    const response = await api.get("/users/cards");
    return response.data;
  },
  addCard: async (payload) => {
    const response = await api.post("/users/cards", payload);
    return response.data;
  },
  deleteCard: async (cardId) => {
    const response = await api.delete(`/users/cards/${cardId}`);
    return response.data;
  },

  // ---- Addresses ----
  getAddresses: async () => {
    const response = await api.get("/users/addresses");
    return response.data;
  },
  addAddress: async (payload) => {
    const response = await api.post("/users/addresses", payload);
    return response.data;
  },
  updateAddress: async (id, payload) => {
    const response = await api.put(`/users/addresses/${id}`, payload);
    return response.data;
  },
  deleteAddress: async (id) => {
    const response = await api.delete(`/users/addresses/${id}`);
    return response.data;
  },
};
