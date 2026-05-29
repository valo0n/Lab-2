const { prisma } = require("../config/database");
const SavedCard = require("../models/nosql/SavedCard");
const BrowsingHistory = require("../models/nosql/BrowsingHistory");

module.exports = {
  // GET /api/users/me — te dhenat e userit te loguar
  getProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          addresses: true,
          user_roles: { include: { role: true } },
        },
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json({ success: true, data: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/users/dashboard — statistika + recent orders + cards + browsing
  getDashboard: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { addresses: true },
      });

      // Statistika e porosive
      const [totalOrders, pendingOrders, completedOrders] = await Promise.all([
        prisma.order.count({ where: { user_id: userId } }),
        prisma.order.count({ where: { user_id: userId, status: "PENDING" } }),
        prisma.order.count({ where: { user_id: userId, status: "COMPLETED" } }),
      ]);

      // Recent orders (7 te fundit)
      const recentOrders = await prisma.order.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
        take: 7,
        include: { order_items: { select: { id: true } } },
      });

      // Payment cards nga MongoDB
      let cards = [];
      try {
        const savedCard = await SavedCard.findOne({ user_id: userId });
        cards = savedCard?.cards || [];
      } catch (e) {
        cards = [];
      }

      // Browsing History nga MongoDB (4 te fundit)
      let browsing = [];
      try {
        browsing = await BrowsingHistory.find({ user_id: userId })
          .sort({ viewed_at: -1 })
          .limit(4)
          .lean();
      } catch (e) {
        browsing = [];
      }

      const { password, ...userInfo } = user;

      res.json({
        success: true,
        data: {
          user: userInfo,
          stats: {
            total: totalOrders,
            pending: pendingOrders,
            completed: completedOrders,
          },
          recentOrders: recentOrders.map((o) => ({
            id: o.order_number || `#${o.id}`,
            status: o.status,
            date: o.created_at,
            total: parseFloat(o.total_amount || 0),
            productCount: o.order_items.length,
          })),
          cards,
          browsing: browsing.map((b) => ({
            name: b.product_name,
            price: b.product_price,
            image: b.product_image || "📦",
            category: b.category,
            brand: b.brand,
            slug: b.product_slug,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/users/browsing — gjithe browsing history (per faqen Browsing History)
  getBrowsing: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const browsing = await BrowsingHistory.find({ user_id: userId })
        .sort({ viewed_at: -1 })
        .lean();

      res.json({
        success: true,
        data: browsing.map((b) => ({
          name: b.product_name,
          price: b.product_price,
          image: b.product_image || "📦",
          category: b.category,
          brand: b.brand,
          slug: b.product_slug,
          viewed_at: b.viewed_at,
        })),
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/users/browsing — ruaj nje produkt te shikuar
  addBrowsing: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const {
        product_id,
        product_name,
        product_slug,
        product_image,
        product_price,
        compare_price,
        category,
        brand,
      } = req.body;

      // Fshi nese ekziston (qe te jete unik dhe i fundit)
      await BrowsingHistory.deleteMany({ user_id: userId, product_id });

      await BrowsingHistory.create({
        user_id: userId,
        product_id,
        product_name,
        product_slug,
        product_image,
        product_price,
        compare_price: compare_price || null,
        category,
        brand,
      });

      res.json({ success: true, message: "Browsing history u ruajt" });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    res.json({ message: "TODO" });
  },
  getById: async (req, res, next) => {
    res.json({ message: "TODO" });
  },
  update: async (req, res, next) => {
    res.json({ message: "TODO" });
  },
  delete: async (req, res, next) => {
    res.json({ message: "TODO" });
  },
};
