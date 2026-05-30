const { prisma } = require("../config/database");

module.exports = {
    exportData: async (req, res, next) => {
        try {
            const { entity } = req.params;
            const handlers = {
                products: () => prisma.product.findMany({ include: { category: true, brand: true, images: true } }),
                categories: () => prisma.category.findMany(),
                orders: () => prisma.order.findMany({ include: { items: true } }),
                users: () => prisma.user.findMany({ include: { user_roles: { include: { role: true } } } }),
                brands: () => prisma.brand.findMany(),
                coupons: () => prisma.coupon.findMany(),
            };

            const loader = handlers[entity];
            if (!loader) {
                return res.status(400).json({ success: false, message: "Entity not supported" });
            }

            const data = await loader();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
};
