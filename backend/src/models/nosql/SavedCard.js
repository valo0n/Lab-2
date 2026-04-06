const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    cards: [{
        card_id: { type: String, required: true },
        brand: { type: String, required: true, enum: ['visa', 'mastercard', 'amex', 'discover', 'other'] },
        last_four: { type: String, required: true, minlength: 4, maxlength: 4 },
        exp_month: { type: Number, required: true, min: 1, max: 12 },
        exp_year: { type: Number, required: true },
        holder_name: { type: String, required: true },
        is_default: { type: Boolean, default: false },
        stripe_payment_method_id: { type: String, required: true },
        added_at: { type: Date, default: Date.now }
    }]
}, { timestamps: true });
module.exports = mongoose.model('SavedCard', schema);
