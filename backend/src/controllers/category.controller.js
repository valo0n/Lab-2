const { prisma } = require("../config/database");
module.exports = {
  // GET /api/categories
  getAll: async (req, res, next) => {
    try {
      const categories = await prisma.category.findMany({
        where: { is_active: true },
        orderBy: { sort_order: "asc" },
        include: {
          _count: { select: { products: true } },
        },
      });
      res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/categories/tree — me parent/children
  getTree: async (req, res, next) => {
    try {
      const categories = await prisma.category.findMany({
        where: { is_active: true, parent_id: null },
        orderBy: { sort_order: "asc" },
        include: {
          subcategories: {
            where: { is_active: true },
            orderBy: { sort_order: "asc" },
          },
          _count: { select: { products: true } },
        },
      });
      res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/categories/:id
  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          subcategories: true,
          _count: { select: { products: true } },
        },
      });
      if (!category) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    res.json({ message: "TODO" });
  },
  update: async (req, res, next) => {
    res.json({ message: "TODO" });
  },
  delete: async (req, res, next) => {
    res.json({ message: "TODO" });
  },
};
