const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user_id: { type: Number, default: null },
    session_id: { type: String, default: null },
    query: { type: String, required: true, trim: true },
    filters: {
        category: String, category_id: Number, brand: String, brand_id: Number,
        price_min: Number, price_max: Number, rating_min: Number,
        sort_by: { type: String, enum: ['relevance', 'price_asc', 'price_desc', 'newest', 'rating', 'popularity'], default: 'relevance' },
        in_stock_only: { type: Boolean, default: false }
    },
    results_count: { type: Number, default: 0 },
    clicked_product_id: { type: Number, default: null },
    searched_at: { type: Date, default: Date.now }
});
schema.index({ user_id: 1, searched_at: -1 });
schema.index({ query: 'text' });
schema.index({ searched_at: 1 }, { expireAfterSeconds: 15552000 });
module.exports = mongoose.model('SearchLog', schema);
