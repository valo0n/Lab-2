const { prisma } = require("../config/database");
const SearchLog = require("../models/nosql/SearchLog");
const jwt = require("jsonwebtoken");

// Auth opsional — orders kërkohen vetëm nëse ka token valid
const tryGetUser = (req) => {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    if (!token) return null;
    const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

module.exports = {
  // GET /api/search/all?q=...&limit=5 — kërkim i avancuar në 5 lista
  searchAll: async (req, res, next) => {
    try {
      const { q = "" } = req.query;
      const take = Math.min(parseInt(req.query.limit || "5", 10), 20);
      if (!q.trim()) {
        return res.json({
          success: true,
          data: {
            products: [],
            categories: [],
            brands: [],
            coupons: [],
            orders: [],
          },
        });
      }

      const user = tryGetUser(req);

      const [products, categories, brands, coupons, orders] = await Promise.all(
        [
          // 1) Produktet — full-text në emër/përshkrim
          prisma.product.findMany({
            where: {
              is_active: true,
              OR: [
                { name: { contains: q } },
                { description: { contains: q } },
                { sku: { contains: q } },
              ],
            },
            take,
            include: {
              images: { where: { is_primary: true }, take: 1 },
              category: { select: { name: true } },
            },
            orderBy: { avg_rating: "desc" },
          }),
          // 2) Kategoritë
          prisma.category.findMany({
            where: { is_active: true, name: { contains: q } },
            take,
          }),
          // 3) Brandet
          prisma.brand.findMany({
            where: { is_active: true, name: { contains: q } },
            take,
          }),
          // 4) Kuponët aktivë (sipas kodit)
          prisma.coupon.findMany({
            where: { is_active: true, code: { contains: q } },
            take,
            select: {
              id: true,
              code: true,
              type: true,
              value: true,
              min_order: true,
            },
          }),
          // 5) Porositë e userit të loguar (numri ose statusi)
          user
            ? prisma.order.findMany({
                where: {
                  user_id: user.id,
                  OR: [
                    { order_number: { contains: q } },
                    { status: { contains: q } },
                  ],
                },
                take,
                select: {
                  id: true,
                  order_number: true,
                  status: true,
                  total: true,
                  created_at: true,
                },
                orderBy: { created_at: "desc" },
              })
            : Promise.resolve([]),
        ],
      );

      // Logim në MongoDB (SearchLog)
      await SearchLog.create({
        user_id: user?.id || null,
        query: q,
        filters: { scope: "all" },
        results_count:
          products.length +
          categories.length +
          brands.length +
          coupons.length +
          orders.length,
      }).catch(() => {});

      res.json({
        success: true,
        data: { products, categories, brands, coupons, orders },
      });
    } catch (error) {
      next(error);
    }
  },

  search: async (req, res, next) => {
    try {
      const {
        q = "",
        category,
        brand,
        minPrice,
        maxPrice,
        sort = "relevance",
        page = 1,
        limit = 12,
      } = req.query;

      const where = { is_active: true };
      if (q)
        where.OR = [
          { name: { contains: q } },
          { description: { contains: q } },
          { short_description: { contains: q } },
        ];
      if (category) where.category_id = parseInt(category, 10);
      if (brand) where.brand_id = parseInt(brand, 10);
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      let orderBy = { created_at: "desc" };
      if (sort === "price_asc") orderBy = { price: "asc" };
      if (sort === "price_desc") orderBy = { price: "desc" };
      if (sort === "rating") orderBy = { avg_rating: "desc" };
      if (sort === "popularity") orderBy = { review_count: "desc" };

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const take = parseInt(limit, 10);

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          orderBy,
          skip,
          take,
          include: {
            category: true,
            brand: true,
            images: { where: { is_primary: true }, take: 1 },
          },
        }),
        prisma.product.count({ where }),
      ]);

      if (q) {
        await SearchLog.create({
          user_id: req.user?.id || null,
          session_id: req.sessionID || null,
          query: q,
          filters: {
            category: category || null,
            brand: brand || null,
            price_min: minPrice ? parseFloat(minPrice) : null,
            price_max: maxPrice ? parseFloat(maxPrice) : null,
            sort_by: sort,
          },
          results_count: total,
        });
      }

      res.json({
        success: true,
        data: products,
        meta: {
          page: parseInt(page, 10),
          limit: take,
          total,
          totalPages: Math.ceil(total / take),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
