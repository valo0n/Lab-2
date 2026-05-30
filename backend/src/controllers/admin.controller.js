const { prisma } = require("../config/database");

const toNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

module.exports = {
    getStats: async (req, res, next) => {
        try {
            const [users, activeUsers, products, orders, pendingOrders, revenue] = await Promise.all([
                prisma.user.count(),
                prisma.user.count({ where: { is_active: true } }),
                prisma.product.count(),
                prisma.order.count(),
                prisma.order.count({ where: { status: "pending" } }),
                prisma.order.aggregate({ _sum: { total: true } }),
            ]);

            res.json({
                success: true,
                data: {
                    users,
                    activeUsers,
                    products,
                    orders,
                    pendingOrders,
                    revenue: toNumber(revenue._sum.total),
                },
            });
        } catch (error) {
            next(error);
        }
    },

    getRecentOrders: async (req, res, next) => {
        try {
            const orders = await prisma.order.findMany({
                orderBy: { created_at: "desc" },
                take: 10,
                include: {
                    user: { select: { first_name: true, last_name: true, email: true } },
                    items: { select: { id: true } },
                },
            });

            res.json({
                success: true,
                data: orders.map((order) => ({
                    id: order.order_number,
                    customer: `${order.user.first_name} ${order.user.last_name}`,
                    email: order.user.email,
                    status: order.status,
                    total: toNumber(order.total),
                    date: order.created_at,
                    items: order.items.length,
                })),
            });
        } catch (error) {
            next(error);
        }
    },

    getRevenueChart: async (req, res, next) => {
        try {
            const monthsBack = 6;
            const fromDate = new Date();
            fromDate.setMonth(fromDate.getMonth() - monthsBack);

            const orders = await prisma.order.findMany({
                where: { created_at: { gte: fromDate } },
                select: { created_at: true, total: true },
            });

            const chart = Array.from({ length: monthsBack }, (_, index) => {
                const date = new Date();
                date.setMonth(date.getMonth() - (monthsBack - 1 - index));
                return {
                    key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
                    label: date.toLocaleString("en", { month: "short" }),
                    revenue: 0,
                };
            });

            for (const order of orders) {
                const date = new Date(order.created_at);
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
                const entry = chart.find((item) => item.key === key);
                if (entry) entry.revenue += toNumber(order.total);
            }

            res.json({ success: true, data: chart });
        } catch (error) {
            next(error);
        }
    },

    getTopProducts: async (req, res, next) => {
        try {
            const rows = await prisma.orderItem.groupBy({
                by: ["product_id"],
                _sum: { quantity: true, total_price: true },
                orderBy: { _sum: { quantity: "desc" } },
                take: 10,
            });

            const products = await prisma.product.findMany({
                where: { id: { in: rows.map((row) => row.product_id) } },
                select: { id: true, name: true, slug: true },
            });

            const productMap = new Map(products.map((product) => [product.id, product]));

            res.json({
                success: true,
                data: rows.map((row) => {
                    const product = productMap.get(row.product_id);
                    return {
                        product_id: row.product_id,
                        name: product?.name || "Unknown",
                        slug: product?.slug || null,
                        sold: row._sum.quantity || 0,
                        revenue: toNumber(row._sum.total_price),
                    };
                }),
            });
        } catch (error) {
            next(error);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await prisma.user.findMany({
                orderBy: { created_at: "desc" },
                include: { user_roles: { include: { role: true } } },
            });

            res.json({
                success: true,
                data: users.map((user) => ({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    is_active: user.is_active,
                    roles: user.user_roles.map((entry) => entry.role.name),
                    created_at: user.created_at,
                })),
            });
        } catch (error) {
            next(error);
        }
    },

    toggleUserStatus: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await prisma.user.findUnique({ where: { id } });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const updated = await prisma.user.update({
                where: { id },
                data: { is_active: !user.is_active, updated_by: req.user.id },
            });

            res.json({ success: true, data: updated });
        } catch (error) {
            next(error);
        }
    },

    getSettings: async (req, res, next) => {
        try {
            const settings = await prisma.setting.findMany({ orderBy: { key_name: "asc" } });
            res.json({ success: true, data: settings });
        } catch (error) {
            next(error);
        }
    },

    updateSettings: async (req, res, next) => {
        try {
            const entries = Object.entries(req.body || {});
            const updates = await Promise.all(
                entries.map(([key_name, value]) =>
                    prisma.setting.upsert({
                        where: { key_name },
                        update: { value: String(value) },
                        create: { key_name, value: String(value) },
                    }),
                ),
            );

            res.json({ success: true, data: updates });
        } catch (error) {
            next(error);
        }
    },
};
