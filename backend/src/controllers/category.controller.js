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
    try {
      const slugify = require("slugify");
      const { name, slug, icon_url, sort_order, is_active = true, parent_id } = req.body;
      const category = await prisma.category.create({
        data: {
          name,
          slug: slug || slugify(name, { lower: true, strict: true }),
          icon_url: icon_url || null,
          sort_order: sort_order !== undefined ? parseInt(sort_order, 10) : 0,
          is_active: is_active === true || is_active === "true",
          parent_id: parent_id ? parseInt(parent_id, 10) : null,
          created_by: req.user.id,
        },
      });
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const slugify = require("slugify");
      const id = parseInt(req.params.id, 10);
      const { name, slug, icon_url, sort_order, is_active, parent_id } = req.body;
      const category = await prisma.category.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(name || slug ? { slug: slug || (name ? slugify(name, { lower: true, strict: true }) : undefined) } : {}),
          ...(icon_url !== undefined && { icon_url: icon_url || null }),
          ...(sort_order !== undefined && { sort_order: parseInt(sort_order, 10) }),
          ...(is_active !== undefined && { is_active: is_active === true || is_active === "true" }),
          ...(parent_id !== undefined && { parent_id: parent_id ? parseInt(parent_id, 10) : null }),
          updated_by: req.user.id,
        },
      });
      res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      await prisma.category.delete({ where: { id } });
      res.json({ success: true, message: "Category u fshi" });
    } catch (error) {
      next(error);
    }
  },
};
