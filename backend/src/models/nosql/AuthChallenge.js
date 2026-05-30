const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    type: {
      type: String,
      required: true,
      enum: ['email_verification', 'password_reset'],
      index: true,
    },
    code_hash: { type: String, required: true },
    expires_at: { type: Date, required: true },
    used_at: { type: Date, default: null },
  },
  { timestamps: true },
);

schema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });
schema.index({ email: 1, type: 1, used_at: 1, expires_at: 1 });

module.exports = mongoose.model('AuthChallenge', schema);