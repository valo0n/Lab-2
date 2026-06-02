const { prisma } = require("../config/database");

// Helper — gjeneron numer porosie unik
function generateOrderNumber() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

module.exports = {
  // POST /api/orders — krijo porosi te re
  create: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const {
        items,
        subtotal,
        shipping_cost = 0,
        discount = 0,
        tax = 0,
        total,
        payment_method,
        notes,
        billing_address,
        shipping_address,
      } = req.body;

      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Porosia s'ka produkte" });
      }

      // Krijo adresen e faturimit nese eshte dhene
      let billingAddressId = null;
      let shippingAddressId = null;

      if (billing_address && billing_address.address) {
        const fullName =
          `${billing_address.first_name || ""} ${billing_address.last_name || ""}`.trim();
        const createdBilling = await prisma.address.create({
          data: {
            user_id: userId,
            label: "Billing",
            full_name: fullName || "Customer",
            phone: billing_address.phone || null,
            street: billing_address.address,
            city: billing_address.city || "",
            state: billing_address.state || null,
            zip_code: billing_address.zip_code || "",
            country: billing_address.country || "",
            created_by: userId,
          },
        });
        billingAddressId = createdBilling.id;
      }

      if (shipping_address && shipping_address.address) {
        const fullNameS =
          `${shipping_address.first_name || ""} ${shipping_address.last_name || ""}`.trim();
        const createdShipping = await prisma.address.create({
          data: {
            user_id: userId,
            label: "Shipping",
            full_name: fullNameS || "Customer",
            phone: shipping_address.phone || null,
            street: shipping_address.address,
            city: shipping_address.city || "",
            state: shipping_address.state || null,
            zip_code: shipping_address.zip_code || "",
            country: shipping_address.country || "",
            created_by: userId,
          },
        });
        shippingAddressId = createdShipping.id;
      } else {
        shippingAddressId = billingAddressId;
      }

      const order = await prisma.order.create({
        data: {
          user_id: userId,
          order_number: generateOrderNumber(),
          status: "pending",
          subtotal: subtotal || total,
          shipping_cost,
          discount,
          tax,
          total,
          shipping_address_id: shippingAddressId,
          billing_address_id: billingAddressId,
          payment_method: payment_method || null,
          notes: notes || null,
          created_by: userId,
          items: {
            create: items.map((it) => ({
              product_id: it.product_id,
              product_name: it.product_name,
              quantity: it.quantity,
              unit_price: it.unit_price,
              total_price: it.unit_price * it.quantity,
            })),
          },
        },
        include: { items: true },
      });

      res.status(201).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/orders — porosite e userit te loguar
  getMyOrders: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 12 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where: { user_id: userId },
          orderBy: { created_at: "desc" },
          skip,
          take,
          include: { items: { select: { id: true } } },
        }),
        prisma.order.count({ where: { user_id: userId } }),
      ]);

      res.json({
        success: true,
        data: orders.map((o) => ({
          id: `#${o.order_number}`,
          orderNumber: o.order_number,
          status: o.status.toUpperCase(),
          date: o.created_at,
          total: parseFloat(o.total),
          productCount: o.items.length,
        })),
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

  // GET /api/orders/track/:orderNumber
  trackOrder: async (req, res, next) => {
    try {
      const order = await prisma.order.findUnique({
        where: { order_number: req.params.orderNumber },
        include: {
          items: true,
          billing_address: true,
          shipping_address: true,
        },
      });
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Porosia s'u gjet" });
      }
      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/orders/:id — detajet e nje porosie
  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          items: { include: { product: { include: { category: true } } } },
          shipping_address: true,
          billing_address: true,
        },
      });

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Porosia s'u gjet" });
      }

      // Siguri — vetem pronari ose admin
      if (
        order.user_id !== req.user.id &&
        !(req.user.roles || []).includes("admin")
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Akses i ndaluar" });
      }

      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/orders/admin/all — te gjitha porosite (admin)
  getAllOrders: async (req, res, next) => {
    try {
      const orders = await prisma.order.findMany({
        orderBy: { created_at: "desc" },
        include: {
          user: { select: { first_name: true, last_name: true, email: true } },
          items: { select: { id: true } },
        },
      });
      res.json({ success: true, data: orders });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/orders/:id/status
  updateStatus: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const order = await prisma.order.update({
        where: { id },
        data: { status, updated_by: req.user.id },
      });
      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/orders/:id/tracking
  addTracking: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { tracking_number, carrier, estimated_delivery } = req.body;
      const order = await prisma.order.update({
        where: { id },
        data: {
          tracking_number,
          carrier,
          estimated_delivery: estimated_delivery
            ? new Date(estimated_delivery)
            : null,
          updated_by: req.user.id,
        },
      });
      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  },
};
