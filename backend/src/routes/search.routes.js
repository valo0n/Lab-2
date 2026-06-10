const router = require("express").Router();
const ctrl = require("../controllers/search.controller");

// Kërkim i avancuar në 5 lista (products, categories, brands, coupons, orders)
router.get("/all", ctrl.searchAll);
// Kërkim produktesh me filtra/renditje/paginim
router.get("/", ctrl.search);

module.exports = router;
