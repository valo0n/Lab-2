const { prisma } = require("../config/database");

const getOrCreateCart = async (userId) => {
    const existing = await prisma.cart.findFirst({
        where: { user_id: userId },
        include: { items: { include: { product: true, variant: true } } },
    });

    if (existing) return existing;

    return prisma.cart.create({
        data: { user_id: userId },
        include: { items: { include: { product: true, variant: true } } },
    });
};

module.exports = {
    getCart: async (req, res, next) => {
        try {
            const cart = await getOrCreateCart(req.user.id);
            res.json({ success: true, data: cart });
        } catch (error) {
            next(error);
        }
    },
    addItem: async (req, res, next) => {
        try {
            const { product_id, variant_id = null, quantity = 1 } = req.body;
            const cart = await getOrCreateCart(req.user.id);

            const existing = await prisma.cartItem.findFirst({
                where: {
                    cart_id: cart.id,
                    product_id: parseInt(product_id, 10),
                    variant_id: variant_id ? parseInt(variant_id, 10) : null,
                },
            });

            if (existing) {
                await prisma.cartItem.update({
                    where: { id: existing.id },
                    data: { quantity: existing.quantity + parseInt(quantity, 10) },
                });
            } else {
                await prisma.cartItem.create({
                    data: {
                        cart_id: cart.id,
                        product_id: parseInt(product_id, 10),
                        variant_id: variant_id ? parseInt(variant_id, 10) : null,
                        quantity: parseInt(quantity, 10),
                    },
                });
            }

            const updated = await getOrCreateCart(req.user.id);
            res.json({ success: true, data: updated });
        } catch (error) {
            next(error);
        }
    },
    updateItem: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { quantity } = req.body;
            await prisma.cartItem.update({ where: { id }, data: { quantity: parseInt(quantity, 10) } });
            const cart = await getOrCreateCart(req.user.id);
            res.json({ success: true, data: cart });
        } catch (error) {
            next(error);
        }
    },
    removeItem: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            await prisma.cartItem.delete({ where: { id } });
            const cart = await getOrCreateCart(req.user.id);
            res.json({ success: true, data: cart });
        } catch (error) {
            next(error);
        }
    },
    clearCart: async (req, res, next) => {
        try {
            const cart = await prisma.cart.findFirst({ where: { user_id: req.user.id } });
            if (cart) {
                await prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });
            }
            res.json({ success: true, message: "Cart u pastrua" });
        } catch (error) {
            next(error);
        }
    },
};
