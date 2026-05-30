const { prisma } = require("../config/database");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const notifications = await prisma.notification.findMany({
                where: { user_id: req.user.id },
                orderBy: { created_at: "desc" },
            });
            res.json({ success: true, data: notifications });
        } catch (error) {
            next(error);
        }
    },
    getUnreadCount: async (req, res, next) => {
        try {
            const count = await prisma.notification.count({ where: { user_id: req.user.id, is_read: false } });
            res.json({ success: true, data: { count } });
        } catch (error) {
            next(error);
        }
    },
    markAsRead: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const notification = await prisma.notification.updateMany({
                where: { id, user_id: req.user.id },
                data: { is_read: true },
            });
            res.json({ success: true, data: notification });
        } catch (error) {
            next(error);
        }
    },
    markAllAsRead: async (req, res, next) => {
        try {
            await prisma.notification.updateMany({ where: { user_id: req.user.id, is_read: false }, data: { is_read: true } });
            res.json({ success: true, message: "Te gjitha njoftimet u shenuan te lexuara" });
        } catch (error) {
            next(error);
        }
    },
};
