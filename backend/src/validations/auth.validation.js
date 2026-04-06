const Joi = require('joi');
const registerSchema = Joi.object({
    first_name: Joi.string().min(2).max(100).required(),
    last_name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
        .messages({ 'string.pattern.base': 'Password must have uppercase, lowercase, and number' }),
    phone: Joi.string().max(20).optional()
});
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
module.exports = { registerSchema, loginSchema };
