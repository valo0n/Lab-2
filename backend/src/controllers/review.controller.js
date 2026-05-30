const { prisma } = require("../config/database");

const refreshProductRating = async (productId) => {
    const aggregate = await prisma.review.aggregate({
        where: { product_id: productId, is_approved: true },
        _avg: { rating: true },
        _count: { rating: true },
    });

    await prisma.product.update({
        where: { id: productId },
        data: {
            avg_rating: aggregate._avg.rating || 0,
            review_count: aggregate._count.rating || 0,
        },
    });
};

module.exports = {
    getByProduct: async (req, res, next) => {
        try {
            const productId = parseInt(req.params.productId, 10);
            const reviews = await prisma.review.findMany({
                where: { product_id: productId, is_approved: true },
                orderBy: { created_at: "desc" },
                include: { user: { select: { first_name: true, last_name: true, avatar_url: true } } },
            });
            res.json({ success: true, data: reviews });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const { product_id, rating, comment } = req.body;
            const review = await prisma.review.upsert({
                where: { product_id_user_id: { product_id: parseInt(product_id, 10), user_id: req.user.id } },
                update: {
                    rating: parseInt(rating, 10),
                    comment: comment || null,
                    is_approved: false,
                    updated_by: req.user.id,
                },
                create: {
                    product_id: parseInt(product_id, 10),
                    user_id: req.user.id,
                    rating: parseInt(rating, 10),
                    comment: comment || null,
                    created_by: req.user.id,
                },
            });
            await refreshProductRating(review.product_id);
            res.status(201).json({ success: true, data: review });
        } catch (error) {
            next(error);
        }
    },
    approve: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const review = await prisma.review.update({ where: { id }, data: { is_approved: true, updated_by: req.user.id } });
            await refreshProductRating(review.product_id);
            res.json({ success: true, data: review });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const review = await prisma.review.delete({ where: { id } });
            await refreshProductRating(review.product_id);
            res.json({ success: true, message: "Review u fshi" });
        } catch (error) {
            next(error);
        }
    },
};
