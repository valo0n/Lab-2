const { prisma } = require("../config/database");
const SearchLog = require("../models/nosql/SearchLog");

module.exports = {
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
            if (q) where.OR = [{ name: { contains: q } }, { description: { contains: q } }, { short_description: { contains: q } }];
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
                    include: { category: true, brand: true, images: { where: { is_primary: true }, take: 1 } },
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
                meta: { page: parseInt(page, 10), limit: take, total, totalPages: Math.ceil(total / take) },
            });
        } catch (error) {
            next(error);
        }
    },
};
