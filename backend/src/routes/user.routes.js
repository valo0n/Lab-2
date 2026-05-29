const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const { auth } = require("../middleware/auth.middleware");

router.get("/me", auth, ctrl.getProfile);
router.get("/dashboard", auth, ctrl.getDashboard);
router.get("/browsing", auth, ctrl.getBrowsing);
router.post("/browsing", auth, ctrl.addBrowsing);

module.exports = router;
