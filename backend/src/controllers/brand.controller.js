const { prisma } = require("../config/database");module.exports = {
  getAll: async (req, res, next) => {
    try {
      const brands = await prisma.brand.findMany({
        where: { is_active: true },
        orderBy: { name: "asc" },
        include: { _count: { select: { products: true } } },
      });
      res.json({ success: true, data: brands });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const brand = await prisma.brand.findUnique({
        where: { id },
        include: { _count: { select: { products: true } } },
      });
      if (!brand) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      res.json({ success: true, data: brand });
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
