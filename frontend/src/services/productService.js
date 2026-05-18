import api from "./api";

export const productService = {
  // Merr të gjitha produktet me filtra
  getAll: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  // Merr produktet e Best Deals (me discount)
  getBestDeals: async () => {
    const response = await api.get("/products", {
      params: { limit: 10, sort: "popular" },
    });
    return response.data;
  },

  // Merr Featured Products
  getFeatured: async () => {
    const response = await api.get("/products", {
      params: { is_featured: true, limit: 8 },
    });
    return response.data;
  },

  // Merr nga kategoria
  getByCategory: async (categoryId, limit = 8) => {
    const response = await api.get("/products", {
      params: { category: categoryId, limit },
    });
    return response.data;
  },

  // Merr një produkt sipas slug
  getBySlug: async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },

  // Merr produktet e ngjashme
  getRelated: async (id) => {
    const response = await api.get(`/products/${id}/related`);
    return response.data;
  },
};

export const categoryService = {
  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  getTree: async () => {
    const response = await api.get("/categories/tree");
    return response.data;
  },
};

export const brandService = {
  getAll: async () => {
    const response = await api.get("/brands");
    return response.data;
  },
};
