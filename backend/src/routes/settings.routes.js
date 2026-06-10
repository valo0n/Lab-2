const router = require("express").Router();
const ctrl = require("../controllers/settings.controller");
const { auth, authorize } = require("../middleware/auth.middleware");

router.get("/", auth, authorize("manage_settings"), ctrl.getAll);
router.put("/:key", auth, authorize("manage_settings"), ctrl.update);

module.exports = router;
