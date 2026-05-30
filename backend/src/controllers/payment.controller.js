const stripe = require("../config/stripe");
const { prisma } = require("../config/database");

module.exports = {
    createIntent: async (req, res, next) => {
        try {
            const { order_id } = req.body;
            const order = await prisma.order.findUnique({ where: { id: parseInt(order_id, 10) } });
            if (!order) return res.status(404).json({ success: false, message: "Order not found" });

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
                    status: intent.status,
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

            if (!secret) return res.status(400).json({ message: "Stripe webhook secret missing" });

            const event = stripe.webhooks.constructEvent(req.body, signature, secret);

            if (event.type === "payment_intent.succeeded") {
                const intent = event.data.object;
                await prisma.payment.updateMany({
                    where: { transaction_id: intent.id },
                    data: { status: "succeeded", updated_by: null },
                });
            }

            res.json({ received: true });
        } catch (error) {
            next(error);
        }
    },
    getByOrder: async (req, res, next) => {
        try {
            const orderId = parseInt(req.params.orderId, 10);
            const payments = await prisma.payment.findMany({ where: { order_id: orderId }, orderBy: { created_at: "desc" } });
            res.json({ success: true, data: payments });
        } catch (error) {
            next(error);
        }
    },
};
