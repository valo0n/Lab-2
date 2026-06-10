const router = require("express").Router();
const ctrl = require("../controllers/review.controller");
const { auth, authorize } = require("../middleware/auth.middleware");
router.get("/product/:productId", ctrl.getByProduct);
router.get("/", auth, authorize("manage_reviews"), ctrl.getAll);
router.post("/", auth, ctrl.create);
router.put("/:id/approve", auth, authorize("manage_reviews"), ctrl.approve);
router.delete("/:id", auth, authorize("manage_reviews"), ctrl.delete);
module.exports = router;
