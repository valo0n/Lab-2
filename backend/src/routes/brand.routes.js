const router = require('express').Router();
const ctrl = require('../controllers/brand.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', auth, authorize('manage_brands'), ctrl.create);
router.put('/:id', auth, authorize('manage_brands'), ctrl.update);
router.delete('/:id', auth, authorize('manage_brands'), ctrl.delete);
module.exports = router;
