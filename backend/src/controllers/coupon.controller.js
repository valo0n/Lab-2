const { prisma } = require("../config/database");

const mapCoupon = (coupon) => ({
  ...coupon,
  value: Number(coupon.value),
  min_order: Number(coupon.min_order),
});

module.exports = {
  validate: async (req, res, next) => {
    try {
      const { code, order_total = 0 } = req.body;
      const coupon = await prisma.coupon.findUnique({ where: { code } });
      if (!coupon || !coupon.is_active) {
        return res
          .status(404)
          .json({ success: false, message: "Coupon i pavlefshem" });
      }
      if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) {
        return res
          .status(400)
          .json({ success: false, message: "Coupon ende nuk ka filluar" });
      }
      if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
        return res
          .status(400)
          .json({ success: false, message: "Coupon ka skaduar" });
      }
      if (Number(order_total) < Number(coupon.min_order)) {
        return res
          .status(400)
          .json({ success: false, message: "Shuma minimale nuk u arrit" });
      }
      if (coupon.usage_limit && coupon.times_used >= coupon.usage_limit) {
        return res
          .status(400)
          .json({ success: false, message: "Coupon i shfrytezuar plotesisht" });
      }
      res.json({ success: true, data: mapCoupon(coupon) });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const coupons = await prisma.coupon.findMany({
        orderBy: { created_at: "desc" },
      });
      res.json({ success: true, data: coupons.map(mapCoupon) });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const coupon = await prisma.coupon.create({
        data: {
          code: req.body.code,
          type: req.body.type,
          value: req.body.value,
          min_order: req.body.min_order || 0,
          usage_limit: req.body.usage_limit
            ? parseInt(req.body.usage_limit, 10)
            : null,
          is_active:
            req.body.is_active === undefined
              ? true
              : req.body.is_active === true || req.body.is_active === "true",
          starts_at: req.body.starts_at ? new Date(req.body.starts_at) : null,
          expires_at: req.body.expires_at
            ? new Date(req.body.expires_at)
            : null,
          created_by: req.user.id,
        },
      });
      res.status(201).json({ success: true, data: mapCoupon(coupon) });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const coupon = await prisma.coupon.update({
        where: { id },
        data: {
          ...(req.body.code && { code: req.body.code }),
          ...(req.body.type && { type: req.body.type }),
          ...(req.body.value !== undefined && { value: req.body.value }),
          ...(req.body.min_order !== undefined && {
            min_order: req.body.min_order,
          }),
          ...(req.body.usage_limit !== undefined && {
            usage_limit: req.body.usage_limit
              ? parseInt(req.body.usage_limit, 10)
              : null,
          }),
          ...(req.body.is_active !== undefined && {
            is_active:
              req.body.is_active === true || req.body.is_active === "true",
          }),
          ...(req.body.starts_at !== undefined && {
            starts_at: req.body.starts_at ? new Date(req.body.starts_at) : null,
          }),
          ...(req.body.expires_at !== undefined && {
            expires_at: req.body.expires_at
              ? new Date(req.body.expires_at)
              : null,
          }),
          updated_by: req.user.id,
        },
      });
      res.json({ success: true, data: mapCoupon(coupon) });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      await prisma.coupon.delete({ where: { id } });
      res.json({ success: true, message: "Coupon u fshi" });
    } catch (error) {
      next(error);
    }
  },
};
