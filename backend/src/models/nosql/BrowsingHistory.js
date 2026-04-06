const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    product_id: { type: Number, required: true },
    product_name: { type: String, required: true },
    product_slug: { type: String },
    product_image: { type: String },
    product_price: { type: Number, required: true },
    compare_price: { type: Number, default: null },
    category: { type: String },
    brand: { type: String },
    viewed_at: { type: Date, default: Date.now }
});
schema.index({ user_id: 1, viewed_at: -1 });
schema.index({ viewed_at: 1 }, { expireAfterSeconds: 7776000 });
module.exports = mongoose.model('BrowsingHistory', schema);
