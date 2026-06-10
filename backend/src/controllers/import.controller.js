const fs = require("fs");
const csv = require("csv-parser");
const ExcelJS = require("exceljs");
const { prisma } = require("../config/database");
const { hashPassword } = require("../utils/hash");

const parseFile = async (filePath) => {
  const lower = filePath.toLowerCase();

  if (lower.endsWith(".json")) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  // Excel (.xlsx) — rreshtat e sheet-it te pare ne objekte {header: vlere}
  if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(filePath);
    const ws = wb.worksheets[0];
    const headers = [];
    ws.getRow(1).eachCell((cell, col) => (headers[col] = String(cell.value)));
    const rows = [];
    ws.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const obj = {};
      row.eachCell((cell, col) => {
        if (headers[col]) obj[headers[col]] = cell.value;
      });
      if (Object.keys(obj).length) rows.push(obj);
    });
    return rows;
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
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "File is required" });
      const rows = await parseFile(req.file.path);

      const created = [];
      for (const row of rows) {
        const category = await prisma.category.findFirst({
          where: {
            OR: [
              {
                id: row.category_id ? parseInt(row.category_id, 10) : undefined,
              },
              { slug: row.category_slug || undefined },
            ],
          },
        });
        if (!category) continue;

        const product = await prisma.product.upsert({
          where: {
            slug: row.slug || row.name.toLowerCase().replace(/\s+/g, "-"),
          },
          update: {
            name: row.name,
            description: row.description || null,
            short_description: row.short_description || null,
            price: parseFloat(row.price),
            compare_price: row.compare_price
              ? parseFloat(row.compare_price)
              : null,
            stock_qty: row.stock_qty ? parseInt(row.stock_qty, 10) : 0,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
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
            compare_price: row.compare_price
              ? parseFloat(row.compare_price)
              : null,
            stock_qty: row.stock_qty ? parseInt(row.stock_qty, 10) : 0,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
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
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "File is required" });
      const rows = await parseFile(req.file.path);
      const created = [];

      for (const row of rows) {
        const category = await prisma.category.upsert({
          where: {
            slug: row.slug || row.name.toLowerCase().replace(/\s+/g, "-"),
          },
          update: {
            name: row.name,
            icon_url: row.icon_url || null,
            sort_order: row.sort_order ? parseInt(row.sort_order, 10) : 0,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
            updated_by: req.user.id,
          },
          create: {
            name: row.name,
            slug: row.slug || row.name.toLowerCase().replace(/\s+/g, "-"),
            icon_url: row.icon_url || null,
            sort_order: row.sort_order ? parseInt(row.sort_order, 10) : 0,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
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

  // POST /api/import/brands — CSV/Excel/JSON me kolona: name, slug?, logo_url?, is_active?
  importBrands: async (req, res, next) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "File is required" });
      const rows = await parseFile(req.file.path);
      let imported = 0;

      for (const row of rows) {
        if (!row.name) continue;
        const slug =
          row.slug || String(row.name).toLowerCase().replace(/\s+/g, "-");
        await prisma.brand.upsert({
          where: { slug },
          update: {
            name: row.name,
            logo_url: row.logo_url || null,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
            updated_by: req.user.id,
          },
          create: {
            name: row.name,
            slug,
            logo_url: row.logo_url || null,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
            created_by: req.user.id,
          },
        });
        imported++;
      }

      res.json({ success: true, data: { imported } });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/import/coupons — kolona: code, type(percentage|fixed), value, min_order?, usage_limit?, is_active?
  importCoupons: async (req, res, next) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "File is required" });
      const rows = await parseFile(req.file.path);
      let imported = 0;

      for (const row of rows) {
        if (!row.code || !row.type || row.value === undefined) continue;
        await prisma.coupon.upsert({
          where: { code: String(row.code).toUpperCase() },
          update: {
            type: row.type,
            value: parseFloat(row.value),
            min_order: row.min_order ? parseFloat(row.min_order) : 0,
            usage_limit: row.usage_limit ? parseInt(row.usage_limit, 10) : null,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
            updated_by: req.user.id,
          },
          create: {
            code: String(row.code).toUpperCase(),
            type: row.type,
            value: parseFloat(row.value),
            min_order: row.min_order ? parseFloat(row.min_order) : 0,
            usage_limit: row.usage_limit ? parseInt(row.usage_limit, 10) : null,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
            created_by: req.user.id,
          },
        });
        imported++;
      }

      res.json({ success: true, data: { imported } });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/import/users — kolona: first_name, last_name, email, password?, role? (emri i rolit)
  importUsers: async (req, res, next) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "File is required" });
      const rows = await parseFile(req.file.path);
      let imported = 0;

      for (const row of rows) {
        if (!row.email || !row.first_name) continue;
        const passwordHash = await hashPassword(
          String(row.password || "Imported@123"),
        );

        const user = await prisma.user.upsert({
          where: { email: String(row.email).toLowerCase() },
          update: {
            first_name: row.first_name,
            last_name: row.last_name || "",
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
            updated_by: req.user.id,
          },
          create: {
            first_name: row.first_name,
            last_name: row.last_name || "",
            email: String(row.email).toLowerCase(),
            password_hash: passwordHash,
            is_active:
              row.is_active !== undefined
                ? row.is_active === "true" || row.is_active === true
                : true,
            created_by: req.user.id,
          },
        });

        // Roli (default Customer)
        const roleName = row.role || "Customer";
        const role = await prisma.role.findFirst({ where: { name: roleName } });
        if (role) {
          await prisma.userRole.upsert({
            where: { user_id_role_id: { user_id: user.id, role_id: role.id } },
            update: {},
            create: { user_id: user.id, role_id: role.id },
          });
        }
        imported++;
      }

      res.json({ success: true, data: { imported } });
    } catch (error) {
      next(error);
    }
  },
};
