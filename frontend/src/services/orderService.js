import api from "./api";

export const orderService = {
  // Merr porosite e userit te loguar
  getMyOrders: async (page = 1, limit = 12) => {
    const response = await api.get("/orders", { params: { page, limit } });
    return response.data;
  },

  // Merr detajet e nje porosie
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Track order me numer
  track: async (orderNumber) => {
    const response = await api.get(`/orders/track/${orderNumber}`);
    return response.data;
  },

  // Krijo porosi te re
  create: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },
};
