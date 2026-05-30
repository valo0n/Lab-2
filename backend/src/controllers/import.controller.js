const fs = require("fs");
const csv = require("csv-parser");
const { prisma } = require("../config/database");

const parseFile = async (filePath) => {
    if (filePath.toLowerCase().endsWith(".json")) {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    const rows = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => rows.push(data))
            .on("end", resolve)
            .on("error", reject);
    });
    return rows;
};

module.exports = {
    importProducts: async (req, res, next) => {
        try {
            if (!req.file) return res.status(400).json({ success: false, message: "File is required" });
            const rows = await parseFile(req.file.path);

            const created = [];
            for (const row of rows) {
                const category = await prisma.category.findFirst({ where: { OR: [{ id: row.category_id ? parseInt(row.category_id, 10) : undefined }, { slug: row.category_slug || undefined }] } });
                if (!category) continue;

                const product = await prisma.product.upsert({
                    where: { slug: row.slug || row.name.toLowerCase().replace(/\s+/g, "-") },
                    update: {
                        name: row.name,
                        description: row.description || null,
                        short_description: row.short_description || null,
                        price: parseFloat(row.price),
                        compare_price: row.compare_price ? parseFloat(row.compare_price) : null,
                        stock_qty: row.stock_qty ? parseInt(row.stock_qty, 10) : 0,
                        is_active: row.is_active !== undefined ? row.is_active === "true" || row.is_active === true : true,
                        is_featured: row.is_featured === "true" || row.is_featured === true,
                        category_id: category.id,
                        updated_by: req.user.id,
                    },
                    create: {
                        category_id: category.id,
                        brand_id: row.brand_id ? parseInt(row.brand_id, 10) : null,
                        name: row.name,
                        slug: row.slug || row.name.toLowerCase().replace(/\s+/g, "-"),
                        description: row.description || null,
                        short_description: row.short_description || null,
                        price: parseFloat(row.price),
                        compare_price: row.compare_price ? parseFloat(row.compare_price) : null,
                        stock_qty: row.stock_qty ? parseInt(row.stock_qty, 10) : 0,
                        is_active: row.is_active !== undefined ? row.is_active === "true" || row.is_active === true : true,
                        is_featured: row.is_featured === "true" || row.is_featured === true,
                        created_by: req.user.id,
                    },
                });
                created.push(product);
            }

            res.json({ success: true, data: { imported: created.length } });
        } catch (error) {
            next(error);
        }
    },
    importCategories: async (req, res, next) => {
        try {
            if (!req.file) return res.status(400).json({ success: false, message: "File is required" });
            const rows = await parseFile(req.file.path);
            const created = [];

            for (const row of rows) {
                const category = await prisma.category.upsert({
                    where: { slug: row.slug || row.name.toLowerCase().replace(/\s+/g, "-") },
                    update: {
                        name: row.name,
                        icon_url: row.icon_url || null,
                        sort_order: row.sort_order ? parseInt(row.sort_order, 10) : 0,
                        is_active: row.is_active !== undefined ? row.is_active === "true" || row.is_active === true : true,
                        updated_by: req.user.id,
                    },
                    create: {
                        name: row.name,
                        slug: row.slug || row.name.toLowerCase().replace(/\s+/g, "-"),
                        icon_url: row.icon_url || null,
                        sort_order: row.sort_order ? parseInt(row.sort_order, 10) : 0,
                        is_active: row.is_active !== undefined ? row.is_active === "true" || row.is_active === true : true,
                        created_by: req.user.id,
                    },
                });
                created.push(category);
            }

            res.json({ success: true, data: { imported: created.length } });
        } catch (error) {
            next(error);
        }
    },
};
