const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    user_id: { type: Number, default: null },
    first_name: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    preferences: {
        promotions: { type: Boolean, default: true },
        new_arrivals: { type: Boolean, default: true },
        order_updates: { type: Boolean, default: true },
        weekly_digest: { type: Boolean, default: false },
        price_drops: { type: Boolean, default: false }
    },
    source: { type: String, enum: ['footer', 'popup', 'checkout', 'registration'], default: 'footer' },
    subscribed_at: { type: Date, default: Date.now },
    unsubscribed_at: { type: Date, default: null }
});
module.exports = mongoose.model('Subscriber', schema);
