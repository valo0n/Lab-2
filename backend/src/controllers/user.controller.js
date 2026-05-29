const { prisma } = require("../config/database");
const SavedCard = require("../models/nosql/SavedCard");

module.exports = {
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

  getDashboard: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { addresses: true },
      });

      const [totalOrders, pendingOrders, completedOrders] = await Promise.all([
        prisma.order.count({ where: { user_id: userId } }),
        prisma.order.count({ where: { user_id: userId, status: "PENDING" } }),
        prisma.order.count({ where: { user_id: userId, status: "COMPLETED" } }),
      ]);

      const recentOrders = await prisma.order.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
        take: 7,
        include: { order_items: { select: { id: true } } },
      });

      let cards = [];
      try {
        const savedCard = await SavedCard.findOne({ user_id: userId });
        cards = savedCard?.cards || [];
      } catch (e) {
        cards = [];
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
        },
      });
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
