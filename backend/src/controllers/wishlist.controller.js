const { prisma } = require("../config/database");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const items = await prisma.wishlist.findMany({
                where: { user_id: req.user.id },
                include: { product: { include: { category: true, brand: true, images: { where: { is_primary: true }, take: 1 } } } },
                orderBy: { created_at: "desc" },
            });
            res.json({ success: true, data: items });
        } catch (error) {
            next(error);
        }
    },
    add: async (req, res, next) => {
        try {
            const { product_id } = req.body;
            const item = await prisma.wishlist.upsert({
                where: { user_id_product_id: { user_id: req.user.id, product_id: parseInt(product_id, 10) } },
                update: {},
                create: { user_id: req.user.id, product_id: parseInt(product_id, 10) },
            });
            res.status(201).json({ success: true, data: item });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const productId = parseInt(req.params.productId, 10);
            await prisma.wishlist.delete({
                where: { user_id_product_id: { user_id: req.user.id, product_id: productId } },
            });
            res.json({ success: true, message: "Wishlist item u hoq" });
        } catch (error) {
            next(error);
        }
    },
};
