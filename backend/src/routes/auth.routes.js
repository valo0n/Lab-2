const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");
const { auth } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verificationSchema,
} = require("../validations/auth.validation");
router.post("/register", validate(registerSchema), ctrl.register);
router.post("/login", validate(loginSchema), ctrl.login);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  ctrl.requestPasswordReset,
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  ctrl.resetPassword,
);
router.post(
  "/send-verification-code",
  validate(forgotPasswordSchema),
  ctrl.requestEmailVerification,
);
router.post("/verify-email", validate(verificationSchema), ctrl.verifyEmail);
router.post("/refresh", ctrl.refreshToken);
router.post("/logout", auth, ctrl.logout);
module.exports = router;
