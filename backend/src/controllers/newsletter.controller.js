const Subscriber = require("../models/nosql/Subscriber");

module.exports = {
    subscribe: async (req, res, next) => {
        try {
            const { email, first_name = null, source = "footer" } = req.body;
            const subscriber = await Subscriber.findOneAndUpdate(
                { email: email.toLowerCase() },
                {
                    email: email.toLowerCase(),
                    first_name,
                    is_active: true,
                    unsubscribed_at: null,
                    source,
                },
                { new: true, upsert: true, setDefaultsOnInsert: true },
            );
            res.status(201).json({ success: true, data: subscriber });
        } catch (error) {
            next(error);
        }
    },
    unsubscribe: async (req, res, next) => {
        try {
            const { email } = req.body;
            const subscriber = await Subscriber.findOneAndUpdate(
                { email: email.toLowerCase() },
                { is_active: false, unsubscribed_at: new Date() },
                { new: true },
            );
            if (!subscriber) return res.status(404).json({ success: false, message: "Subscriber not found" });
            res.json({ success: true, data: subscriber });
        } catch (error) {
            next(error);
        }
    },
};
