const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const { auth } = require("../middleware/auth.middleware");

router.get("/me", auth, ctrl.getProfile);
router.get("/dashboard", auth, ctrl.getDashboard);

module.exports = router;