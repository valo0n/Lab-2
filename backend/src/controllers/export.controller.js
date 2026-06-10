const ExcelJS = require("exceljs");
const { prisma } = require("../config/database");

// Rrafshon rreshtat per export (pa objekte te ndërthurura)
const FLATTENERS = {
  products: (p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku || "",
    price: Number(p.price),
    compare_price: p.compare_price ? Number(p.compare_price) : "",
    stock_qty: p.stock_qty,
    category: p.category?.name || "",
    brand: p.brand?.name || "",
    is_active: p.is_active,
    is_featured: p.is_featured,
    avg_rating: Number(p.avg_rating),
    review_count: p.review_count,
    created_at: p.created_at,
  }),
  categories: (c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    parent_id: c.parent_id || "",
    is_active: c.is_active,
    created_at: c.created_at,
  }),
  orders: (o) => ({
    id: o.id,
    order_number: o.order_number,
    user_id: o.user_id,
    status: o.status,
    payment_status: o.payment_status || "",
    subtotal: Number(o.subtotal),
    discount: Number(o.discount || 0),
    tax: Number(o.tax || 0),
    total: Number(o.total),
    items_count: o.items?.length ?? "",
    created_at: o.created_at,
  }),
  users: (u) => ({
    id: u.id,
    first_name: u.first_name,
    last_name: u.last_name,
    email: u.email,
    roles: (u.user_roles || []).map((r) => r.role?.name).join("|"),
    is_active: u.is_active,
    created_at: u.created_at,
  }),
  brands: (b) => ({
    id: b.id,
    name: b.name,
    slug: b.slug,
    is_active: b.is_active,
    created_at: b.created_at,
  }),
  coupons: (c) => ({
    id: c.id,
    code: c.code,
    type: c.type,
    value: Number(c.value),
    min_order: Number(c.min_order || 0),
    usage_limit: c.usage_limit || "",
    times_used: c.times_used,
    is_active: c.is_active,
    starts_at: c.starts_at || "",
    expires_at: c.expires_at || "",
  }),
};

const LOADERS = {
  products: () =>
    prisma.product.findMany({ include: { category: true, brand: true } }),
  categories: () => prisma.category.findMany(),
  orders: () => prisma.order.findMany({ include: { items: true } }),
  users: () =>
    prisma.user.findMany({
      include: { user_roles: { include: { role: true } } },
    }),
  brands: () => prisma.brand.findMany(),
  coupons: () => prisma.coupon.findMany(),
};

// CSV me escape të saktë
const toCsv = (rows) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ].join("\n");
};

module.exports = {
  // GET /api/export/:entity?format=json|csv|xlsx
  exportData: async (req, res, next) => {
    try {
      const { entity } = req.params;
      const format = (req.query.format || "json").toLowerCase();

      const loader = LOADERS[entity];
      if (!loader) {
        return res
          .status(400)
          .json({ success: false, message: "Entity not supported" });
      }

      const raw = await loader();
      const flatten = FLATTENERS[entity] || ((x) => x);
      const rows = raw.map(flatten);
      const filename = `${entity}-${new Date().toISOString().slice(0, 10)}`;

      if (format === "csv") {
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}.csv"`,
        );
        return res.send(toCsv(rows));
      }

      if (format === "xlsx" || format === "excel") {
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet(entity);
        if (rows.length) {
          ws.columns = Object.keys(rows[0]).map((k) => ({
            header: k,
            key: k,
            width: Math.max(12, k.length + 2),
          }));
          ws.getRow(1).font = { bold: true };
          rows.forEach((r) => ws.addRow(r));
        }
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        );
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}.xlsx"`,
        );
        await wb.xlsx.write(res);
        return res.end();
      }

      // JSON (default) — si file i shkarkueshëm kur kërkohet ?download=1
      if (req.query.download) {
        res.setHeader("Content-Type", "application/json");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}.json"`,
        );
        return res.send(JSON.stringify(rows, null, 2));
      }
      res.json({ success: true, data: rows });
    } catch (error) {
      next(error);
    }
  },
};
