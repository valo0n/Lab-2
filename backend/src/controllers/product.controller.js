const { prisma } = require("../config/database");
const slugify = require("slugify");

const parseMaybeJson = (value, fallback = []) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return fallback;
};

const toBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === "") return fallback;
  return value === true || value === "true" || value === 1 || value === "1";
};

const mapFilesToImages = (files = []) =>
  files.map((file, index) => ({
    image_url: `/uploads/${file.filename}`,
    sort_order: index,
    is_primary: index === 0,
  }));

module.exports = {
  // GET /api/products — me filtra për homepage seksione
  getAll: async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        brand,
        is_featured,
        sort = "newest",
        minPrice,
        maxPrice,
        search,
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);

      // Build filters
      const where = { is_active: true };

      if (category) where.category_id = parseInt(category);
      if (brand) where.brand_id = parseInt(brand);
      if (is_featured === "true") where.is_featured = true;
      if (search) where.name = { contains: search };
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      // Sort options
      let orderBy = { created_at: "desc" };
      if (sort === "price-low") orderBy = { price: "asc" };
      if (sort === "price-high") orderBy = { price: "desc" };
      if (sort === "rating") orderBy = { avg_rating: "desc" };
      if (sort === "popular") orderBy = { review_count: "desc" };

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take,
          orderBy,
          include: {
            category: { select: { name: true, slug: true } },
            brand: { select: { name: true, slug: true } },
            images: { where: { is_primary: true }, take: 1 },
          },
        }),
        prisma.product.count({ where }),
      ]);

      res.json({
        success: true,
        data: products,
        meta: {
          page: parseInt(page),
          limit: take,
          total,
          totalPages: Math.ceil(total / take),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/products/:slug
  getBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          brand: true,
          images: { orderBy: { sort_order: "asc" } },
          variants: true,
          product_tags: { include: { tag: true } },
        },
      });

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/products/:id/related
  getRelated: async (req, res, next) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const related = await prisma.product.findMany({
        where: {
          category_id: product.category_id,
          id: { not: product.id },
          is_active: true,
        },
        take: 8,
        include: {
          category: { select: { name: true } },
          images: { where: { is_primary: true }, take: 1 },
        },
      });

      res.json({ success: true, data: related });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const {
        category_id,
        brand_id,
        name,
        description,
        short_description,
        price,
        compare_price,
        stock_qty,
        sku,
        is_active,
        is_featured,
        tags,
        variants,
      } = req.body;

      const files = Array.isArray(req.files) ? req.files : [];
      const tagValues = parseMaybeJson(tags, []);
      const variantValues = parseMaybeJson(variants, []);

      const product = await prisma.$transaction(async (tx) => {
        const created = await tx.product.create({
          data: {
            category_id: parseInt(category_id, 10),
            brand_id: brand_id ? parseInt(brand_id, 10) : null,
            name,
            slug: slugify(name, { lower: true, strict: true }),
            description: description || null,
            short_description: short_description || null,
            price: parseFloat(price),
            compare_price: compare_price ? parseFloat(compare_price) : null,
            stock_qty: stock_qty !== undefined ? parseInt(stock_qty, 10) : 0,
            sku: sku || null,
            is_active: toBool(is_active, true),
            is_featured: toBool(is_featured, false),
            created_by: req.user.id,
          },
        });

        if (files.length) {
          await tx.productImage.createMany({
            data: mapFilesToImages(files).map((image) => ({
              ...image,
              product_id: created.id,
            })),
          });
        }

        if (tagValues.length) {
          for (const tagValue of tagValues) {
            const tagName =
              typeof tagValue === "string"
                ? tagValue
                : tagValue.name || tagValue.tag;
            if (!tagName) continue;
            const tag = await tx.tag.upsert({
              where: { slug: slugify(tagName, { lower: true, strict: true }) },
              update: { name: tagName },
              create: {
                name: tagName,
                slug: slugify(tagName, { lower: true, strict: true }),
              },
            });
            await tx.productTag.create({
              data: { product_id: created.id, tag_id: tag.id },
            });
          }
        }

        if (variantValues.length) {
          for (const variant of variantValues) {
            await tx.productVariant.create({
              data: {
                product_id: created.id,
                variant_type: variant.variant_type || variant.type || "default",
                variant_value:
                  variant.variant_value || variant.value || "default",
                price_adj: variant.price_adj
                  ? parseFloat(variant.price_adj)
                  : 0,
                stock_qty: variant.stock_qty
                  ? parseInt(variant.stock_qty, 10)
                  : 0,
                sku: variant.sku || null,
              },
            });
          }
        }

        return created;
      });

      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        category_id,
        brand_id,
        name,
        description,
        short_description,
        price,
        compare_price,
        stock_qty,
        sku,
        is_active,
        is_featured,
        tags,
        variants,
      } = req.body;

      const files = Array.isArray(req.files) ? req.files : [];
      const tagValues = parseMaybeJson(tags, null);
      const variantValues = parseMaybeJson(variants, null);

      const product = await prisma.$transaction(async (tx) => {
        const updated = await tx.product.update({
          where: { id },
          data: {
            ...(category_id && { category_id: parseInt(category_id, 10) }),
            ...(brand_id !== undefined && {
              brand_id: brand_id ? parseInt(brand_id, 10) : null,
            }),
            ...(name && {
              name,
              slug: slugify(name, { lower: true, strict: true }),
            }),
            ...(description !== undefined && {
              description: description || null,
            }),
            ...(short_description !== undefined && {
              short_description: short_description || null,
            }),
            ...(price !== undefined && { price: parseFloat(price) }),
            ...(compare_price !== undefined && {
              compare_price: compare_price ? parseFloat(compare_price) : null,
            }),
            ...(stock_qty !== undefined && {
              stock_qty: parseInt(stock_qty, 10),
            }),
            ...(sku !== undefined && { sku: sku || null }),
            ...(is_active !== undefined && {
              is_active: toBool(is_active, true),
            }),
            ...(is_featured !== undefined && {
              is_featured: toBool(is_featured, false),
            }),
            updated_by: req.user.id,
          },
        });

        if (files.length) {
          await tx.productImage.deleteMany({ where: { product_id: id } });
          await tx.productImage.createMany({
            data: mapFilesToImages(files).map((image) => ({
              ...image,
              product_id: id,
            })),
          });
        }

        if (tagValues) {
          await tx.productTag.deleteMany({ where: { product_id: id } });
          for (const tagValue of tagValues) {
            const tagName =
              typeof tagValue === "string"
                ? tagValue
                : tagValue.name || tagValue.tag;
            if (!tagName) continue;
            const tag = await tx.tag.upsert({
              where: { slug: slugify(tagName, { lower: true, strict: true }) },
              update: { name: tagName },
              create: {
                name: tagName,
                slug: slugify(tagName, { lower: true, strict: true }),
              },
            });
            await tx.productTag.create({
              data: { product_id: id, tag_id: tag.id },
            });
          }
        }

        if (variantValues) {
          await tx.productVariant.deleteMany({ where: { product_id: id } });
          for (const variant of variantValues) {
            await tx.productVariant.create({
              data: {
                product_id: id,
                variant_type: variant.variant_type || variant.type || "default",
                variant_value:
                  variant.variant_value || variant.value || "default",
                price_adj: variant.price_adj
                  ? parseFloat(variant.price_adj)
                  : 0,
                stock_qty: variant.stock_qty
                  ? parseInt(variant.stock_qty, 10)
                  : 0,
                sku: variant.sku || null,
              },
            });
          }
        }

        return updated;
      });

      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      await prisma.product.delete({ where: { id } });
      res.json({ success: true, message: "Product u fshi" });
    } catch (error) {
      next(error);
    }
  },
};
