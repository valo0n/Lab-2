const router = require('express').Router();
const ctrl = require('../controllers/import.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
const { uploadDocument } = require('../middleware/upload.middleware');

// Import për 5 lista (CSV / Excel / JSON)
router.post('/products', auth, authorize('manage_products'), uploadDocument, ctrl.importProducts);
router.post('/categories', auth, authorize('manage_categories'), uploadDocument, ctrl.importCategories);
router.post('/brands', auth, authorize('manage_brands'), uploadDocument, ctrl.importBrands);
router.post('/coupons', auth, authorize('manage_coupons'), uploadDocument, ctrl.importCoupons);
router.post('/users', auth, authorize('manage_users'), uploadDocument, ctrl.importUsers);

module.exports = router;