const stripe = require("../config/stripe");
const { prisma } = require("../config/database");

module.exports = {
  createIntent: async (req, res, next) => {
    try {
      const { order_id } = req.body;
      const order = await prisma.order.findUnique({
        where: { id: parseInt(order_id, 10) },
      });
      if (!order)
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });

      const intent = await stripe.paymentIntents.create({
        amount: Math.round(Number(order.total) * 100),
        currency: "usd",
        metadata: { order_id: String(order.id), user_id: String(req.user.id) },
      });

      await prisma.payment.create({
        data: {
          order_id: order.id,
          gateway: "stripe",
          transaction_id: intent.id,
          method: "card",
          // Stripe e kthen p.sh. "requires_payment_method" (>20 char) qe s'hyn ne VarChar(20).
          // Ruajme "pending"; behet "paid" te confirmPayment/webhook.
          status: "pending",
          amount: order.total,
          currency: "USD",
          created_by: req.user.id,
        },
      });

      res.json({ success: true, data: { clientSecret: intent.client_secret } });
    } catch (error) {
      next(error);
    }
  },
  webhook: async (req, res, next) => {
    try {
      const signature = req.headers["stripe-signature"];
      const secret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!secret)
        return res
          .status(400)
          .json({ message: "Stripe webhook secret missing" });

      const event = stripe.webhooks.constructEvent(req.body, signature, secret);

      if (event.type === "payment_intent.succeeded") {
        const intent = event.data.object;
        await prisma.payment.updateMany({
          where: { transaction_id: intent.id },
          data: { status: "paid", updated_by: null },
        });
        // Perditeso edhe porosine nese e dime nga metadata
        const orderId = parseInt(intent.metadata?.order_id, 10);
        if (orderId) {
          await prisma.order.update({
            where: { id: orderId },
            data: { payment_status: "paid", status: "confirmed" },
          });
        }
      }

      res.json({ received: true });
    } catch (error) {
      next(error);
    }
  },
  // POST /api/payments/confirm — verifikon intentin te Stripe dhe perditeson statusin
  // (Perdoret per dev pa webhook publik; e ben pagesen "paid" vetem nese Stripe konfirmon)
  confirmPayment: async (req, res, next) => {
    try {
      const { order_id, payment_intent_id } = req.body;
      if (!payment_intent_id) {
        return res
          .status(400)
          .json({ success: false, message: "payment_intent_id mungon" });
      }

      const intent = await stripe.paymentIntents.retrieve(payment_intent_id);
      const paid = intent.status === "succeeded";

      await prisma.payment.updateMany({
        where: { transaction_id: payment_intent_id },
        data: {
          // Vetem vlera te shkurtra qe hyjne ne VarChar(20)
          status: paid ? "paid" : "pending",
          method: intent.payment_method_types?.[0] || "card",
          updated_by: req.user.id,
        },
      });

      if (paid && order_id) {
        await prisma.order.update({
          where: { id: parseInt(order_id, 10) },
          data: { payment_status: "paid", status: "confirmed" },
        });
      }

      res.json({ success: true, data: { status: intent.status, paid } });
    } catch (error) {
      next(error);
    }
  },
  getByOrder: async (req, res, next) => {
    try {
      const orderId = parseInt(req.params.orderId, 10);
      const payments = await prisma.payment.findMany({
        where: { order_id: orderId },
        orderBy: { created_at: "desc" },
      });
      res.json({ success: true, data: payments });
    } catch (error) {
      next(error);
    }
  },
};
