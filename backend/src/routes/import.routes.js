const router = require('express').Router();
const ctrl = require('../controllers/import.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
const { uploadSingle } = require('../middleware/upload.middleware');
router.post('/products', auth, authorize('manage_products'), uploadSingle, ctrl.importProducts);
router.post('/categories', auth, authorize('manage_categories'), uploadSingle, ctrl.importCategories);
module.exports = router;
