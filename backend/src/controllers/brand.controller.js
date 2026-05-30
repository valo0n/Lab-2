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
    try {
      const slugify = require("slugify");
      const { name, logo_url, is_active = true } = req.body;
      const brand = await prisma.brand.create({
        data: {
          name,
          slug: slugify(name, { lower: true, strict: true }),
          logo_url: logo_url || null,
          is_active: is_active === true || is_active === "true",
          created_by: req.user.id,
        },
      });
      res.status(201).json({ success: true, data: brand });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const slugify = require("slugify");
      const id = parseInt(req.params.id, 10);
      const { name, logo_url, is_active } = req.body;
      const brand = await prisma.brand.update({
        where: { id },
        data: {
          ...(name && { name, slug: slugify(name, { lower: true, strict: true }) }),
          ...(logo_url !== undefined && { logo_url: logo_url || null }),
          ...(is_active !== undefined && { is_active: is_active === true || is_active === "true" }),
          updated_by: req.user.id,
        },
      });
      res.json({ success: true, data: brand });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      await prisma.brand.delete({ where: { id } });
      res.json({ success: true, message: "Brand u fshi" });
    } catch (error) {
      next(error);
    }
  },
};
