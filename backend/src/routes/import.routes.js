const router = require('express').Router();
const ctrl = require('../controllers/import.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
const { uploadDocument } = require('../middleware/upload.middleware');
router.post('/products', auth, authorize('manage_products'), uploadDocument, ctrl.importProducts);
router.post('/categories', auth, authorize('manage_categories'), uploadDocument, ctrl.importCategories);
module.exports = router;
