const { prisma } = require("../config/database");
module.exports = {
  // GET /api/products — me filtra për homepage seksione
  getAll: async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        brand,
        is_featured,
        sort = "newest",
        minPrice,
        maxPrice,
        search,
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);

      // Build filters
      const where = { is_active: true };

      if (category) where.category_id = parseInt(category);
      if (brand) where.brand_id = parseInt(brand);
      if (is_featured === "true") where.is_featured = true;
      if (search) where.name = { contains: search };
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      // Sort options
      let orderBy = { created_at: "desc" };
      if (sort === "price-low") orderBy = { price: "asc" };
      if (sort === "price-high") orderBy = { price: "desc" };
      if (sort === "rating") orderBy = { avg_rating: "desc" };
      if (sort === "popular") orderBy = { review_count: "desc" };

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take,
          orderBy,
          include: {
            category: { select: { name: true, slug: true } },
            brand: { select: { name: true, slug: true } },
            images: { where: { is_primary: true }, take: 1 },
          },
        }),
        prisma.product.count({ where }),
      ]);

      res.json({
        success: true,
        data: products,
        meta: {
          page: parseInt(page),
          limit: take,
          total,
          totalPages: Math.ceil(total / take),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/products/:slug
  getBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          brand: true,
          images: { orderBy: { sort_order: "asc" } },
          variants: true,
          product_tags: { include: { tag: true } },
        },
      });

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/products/:id/related
  getRelated: async (req, res, next) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const related = await prisma.product.findMany({
        where: {
          category_id: product.category_id,
          id: { not: product.id },
          is_active: true,
        },
        take: 8,
        include: {
          category: { select: { name: true } },
          images: { where: { is_primary: true }, take: 1 },
        },
      });

      res.json({ success: true, data: related });
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
