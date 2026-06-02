const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const { auth } = require("../middleware/auth.middleware");

router.get("/me", auth, ctrl.getProfile);
router.get("/dashboard", auth, ctrl.getDashboard);
router.get("/browsing", auth, ctrl.getBrowsing);
router.post("/browsing", auth, ctrl.addBrowsing);

// Cards (MongoDB)
router.get("/cards", auth, ctrl.getCards);
router.post("/cards", auth, ctrl.addCard);
router.delete("/cards/:cardId", auth, ctrl.deleteCard);

// Addresses (MySQL)
router.get("/addresses", auth, ctrl.getAddresses);
router.post("/addresses", auth, ctrl.addAddress);
router.put("/addresses/:id", auth, ctrl.updateAddress);
router.delete("/addresses/:id", auth, ctrl.deleteAddress);

module.exports = router;
