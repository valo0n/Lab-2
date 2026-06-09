const { prisma } = require("../config/database");
const crypto = require("crypto");
const SavedCard = require("../models/nosql/SavedCard");
const BrowsingHistory = require("../models/nosql/BrowsingHistory");

// Helper: zbulon brand-in nga numri i kartes
function detectBrand(number) {
  const n = String(number).replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(6011|65|64[4-9])/.test(n)) return "discover";
  // Fallback: nese nuk njihet, trajtoje si visa (jo "other")
  return "visa";
}

// Helper: parse "MM/YY" ose "MM/YYYY"
function parseExpiry(expiry) {
  const [mmRaw, yyRaw] = String(expiry)
    .split("/")
    .map((s) => s.trim());
  const exp_month = parseInt(mmRaw, 10);
  let exp_year = parseInt(yyRaw, 10);
  if (yyRaw && yyRaw.length === 2) exp_year = 2000 + exp_year;
  return { exp_month, exp_year };
}

module.exports = {
  // GET /api/users/admin/all — lista e të gjithë userave (vetëm admin/manage_users)
  getAllUsers: async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          is_active: true,
          created_at: true,
          user_roles: { include: { role: { select: { name: true } } } },
        },
      });
      const data = users.map((u) => ({
        id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        is_active: u.is_active,
        created_at: u.created_at,
        roles: u.user_roles.map((ur) => ur.role.name),
      }));
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/users/me — te dhenat e userit te loguar
  getProfile: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          addresses: true,
          user_roles: { include: { role: true } },
        },
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json({ success: true, data: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/users/dashboard — statistika + recent orders + cards + browsing
  getDashboard: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { addresses: true },
      });

      // Statistika e porosive
      const [totalOrders, pendingOrders, completedOrders] = await Promise.all([
        prisma.order.count({ where: { user_id: userId } }),
        prisma.order.count({ where: { user_id: userId, status: "pending" } }),
        prisma.order.count({ where: { user_id: userId, status: "delivered" } }),
      ]);

      // Recent orders (7 te fundit)
      const recentOrders = await prisma.order.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
        take: 7,
        include: { items: { select: { id: true } } },
      });

      // Payment cards nga MongoDB
      let cards = [];
      try {
        const savedCard = await SavedCard.findOne({ user_id: userId });
        cards = savedCard?.cards || [];
      } catch (e) {
        cards = [];
      }

      // Browsing History nga MongoDB (4 te fundit)
      let browsing = [];
      try {
        browsing = await BrowsingHistory.find({ user_id: userId })
          .sort({ viewed_at: -1 })
          .limit(4)
          .lean();
      } catch (e) {
        browsing = [];
      }

      const { password, ...userInfo } = user;

      res.json({
        success: true,
        data: {
          user: userInfo,
          stats: {
            total: totalOrders,
            pending: pendingOrders,
            completed: completedOrders,
          },
          recentOrders: recentOrders.map((o) => ({
            id: o.order_number || `#${o.id}`,
            status: o.status,
            date: o.created_at,
            total: parseFloat(o.total_amount || 0),
            productCount: o.items.length,
          })),
          cards,
          browsing: browsing.map((b) => ({
            name: b.product_name,
            price: b.product_price,
            image: b.product_image || "📦",
            category: b.category,
            brand: b.brand,
            slug: b.product_slug,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/users/browsing — gjithe browsing history (per faqen Browsing History)
  getBrowsing: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const browsing = await BrowsingHistory.find({ user_id: userId })
        .sort({ viewed_at: -1 })
        .lean();

      res.json({
        success: true,
        data: browsing.map((b) => ({
          name: b.product_name,
          price: b.product_price,
          image: b.product_image || "📦",
          category: b.category,
          brand: b.brand,
          slug: b.product_slug,
          viewed_at: b.viewed_at,
        })),
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/users/browsing — ruaj nje produkt te shikuar
  addBrowsing: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const {
        product_id,
        product_name,
        product_slug,
        product_image,
        product_price,
        compare_price,
        category,
        brand,
      } = req.body;

      // Fshi nese ekziston (qe te jete unik dhe i fundit)
      await BrowsingHistory.deleteMany({ user_id: userId, product_id });

      await BrowsingHistory.create({
        user_id: userId,
        product_id,
        product_name,
        product_slug,
        product_image,
        product_price,
        compare_price: compare_price || null,
        category,
        brand,
      });

      res.json({ success: true, message: "Browsing history u ruajt" });
    } catch (error) {
      next(error);
    }
  },

  // ==================== CARDS (MongoDB / SavedCard) ====================

  // GET /api/users/cards
  getCards: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const doc = await SavedCard.findOne({ user_id: userId });
      res.json({ success: true, data: doc?.cards || [] });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/users/cards  { name, number, expiry, cvc, is_default }
  addCard: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { name, number, expiry, brand: brandInput, is_default } = req.body;

      if (!name || !number || !expiry) {
        return res.status(400).json({
          success: false,
          message: "Name, number dhe expiry jane te detyrueshme",
        });
      }

      const digits = String(number).replace(/\D/g, "");
      if (digits.length < 12) {
        return res
          .status(400)
          .json({ success: false, message: "Numri i kartes nuk eshte valid" });
      }

      const { exp_month, exp_year } = parseExpiry(expiry);
      if (!exp_month || exp_month < 1 || exp_month > 12 || !exp_year) {
        return res.status(400).json({
          success: false,
          message: "Data e skadimit nuk eshte valide",
        });
      }

      const validBrands = ["visa", "mastercard", "amex", "discover"];
      const brand = validBrands.includes(brandInput)
        ? brandInput
        : detectBrand(digits);
      // NUK ruajme numrin e plote as CVC — vetem 4 shifrat e fundit (PCI-safe)
      const newCard = {
        card_id: "card_" + crypto.randomBytes(6).toString("hex"),
        brand,
        last_four: digits.slice(-4),
        exp_month,
        exp_year,
        holder_name: name,
        is_default: false,
        // Test mode placeholder — ne prodhim do vinte nga Stripe
        stripe_payment_method_id:
          "pm_test_" + crypto.randomBytes(8).toString("hex"),
        added_at: new Date(),
      };

      let doc = await SavedCard.findOne({ user_id: userId });
      if (!doc) {
        // Karta e pare behet default automatikisht
        newCard.is_default = true;
        doc = await SavedCard.create({ user_id: userId, cards: [newCard] });
      } else {
        const makeDefault = is_default === true || doc.cards.length === 0;
        if (makeDefault) {
          doc.cards.forEach((c) => (c.is_default = false));
          newCard.is_default = true;
        }
        doc.cards.push(newCard);
        await doc.save();
      }

      res.status(201).json({ success: true, data: doc.cards });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/users/cards/:cardId
  deleteCard: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { cardId } = req.params;

      const doc = await SavedCard.findOne({ user_id: userId });
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "Nuk u gjet asnje karte" });
      }

      const wasDefault = doc.cards.find(
        (c) => c.card_id === cardId,
      )?.is_default;
      doc.cards = doc.cards.filter((c) => c.card_id !== cardId);

      // Nese fshime karten default, bej default te paren qe mbetet
      if (wasDefault && doc.cards.length > 0) {
        doc.cards[0].is_default = true;
      }

      await doc.save();
      res.json({ success: true, data: doc.cards });
    } catch (error) {
      next(error);
    }
  },

  // ==================== ADDRESSES (MySQL / Prisma) ====================

  // GET /api/users/addresses
  getAddresses: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const addresses = await prisma.address.findMany({
        where: { user_id: userId },
        orderBy: { id: "asc" },
      });
      res.json({ success: true, data: addresses });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/users/addresses
  addAddress: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const {
        label,
        full_name,
        phone,
        street,
        city,
        state,
        zip_code,
        country,
        is_default,
      } = req.body;

      if (!full_name || !street || !city || !zip_code || !country) {
        return res.status(400).json({
          success: false,
          message:
            "full_name, street, city, zip_code dhe country jane te detyrueshme",
        });
      }

      const created = await prisma.address.create({
        data: {
          user_id: userId,
          label: label || null,
          full_name,
          phone: phone || null,
          street,
          city,
          state: state || null,
          zip_code,
          country,
          is_default: is_default === true || is_default === "true",
          created_by: userId,
        },
      });

      res.status(201).json({ success: true, data: created });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/users/addresses/:id
  updateAddress: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const id = parseInt(req.params.id, 10);

      const existing = await prisma.address.findUnique({ where: { id } });
      if (!existing || existing.user_id !== userId) {
        return res
          .status(404)
          .json({ success: false, message: "Adresa nuk u gjet" });
      }

      const {
        label,
        full_name,
        phone,
        street,
        city,
        state,
        zip_code,
        country,
        is_default,
      } = req.body;

      const updated = await prisma.address.update({
        where: { id },
        data: {
          ...(label !== undefined && { label: label || null }),
          ...(full_name && { full_name }),
          ...(phone !== undefined && { phone: phone || null }),
          ...(street && { street }),
          ...(city && { city }),
          ...(state !== undefined && { state: state || null }),
          ...(zip_code && { zip_code }),
          ...(country && { country }),
          ...(is_default !== undefined && {
            is_default: is_default === true || is_default === "true",
          }),
          updated_by: userId,
        },
      });

      res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/users/addresses/:id
  deleteAddress: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const id = parseInt(req.params.id, 10);

      const existing = await prisma.address.findUnique({ where: { id } });
      if (!existing || existing.user_id !== userId) {
        return res
          .status(404)
          .json({ success: false, message: "Adresa nuk u gjet" });
      }

      await prisma.address.delete({ where: { id } });
      res.json({ success: true, message: "Adresa u fshi" });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: { created_at: "desc" },
        include: { user_roles: { include: { role: true } } },
      });

      res.json({
        success: true,
        data: users.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          is_active: user.is_active,
          roles: user.user_roles.map((entry) => entry.role.name),
        })),
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await prisma.user.findUnique({
        where: { id },
        include: { addresses: true, user_roles: { include: { role: true } } },
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({
        success: true,
        data: {
          ...user,
          roles: user.user_roles.map((entry) => entry.role.name),
        },
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { first_name, last_name, email, phone, avatar_url, is_active } =
        req.body;
      const updated = await prisma.user.update({
        where: { id },
        data: {
          ...(first_name && { first_name }),
          ...(last_name && { last_name }),
          ...(email && { email }),
          ...(phone !== undefined && { phone: phone || null }),
          ...(avatar_url !== undefined && { avatar_url: avatar_url || null }),
          ...(is_active !== undefined && {
            is_active: is_active === true || is_active === "true",
          }),
          updated_by: req.user?.id || null,
        },
      });

      res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      await prisma.user.delete({ where: { id } });
      res.json({ success: true, message: "User u fshi" });
    } catch (error) {
      next(error);
    }
  },
};
