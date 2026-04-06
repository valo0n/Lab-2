const router = require('express').Router();
const ctrl = require('../controllers/coupon.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
router.post('/validate', auth, ctrl.validate);
router.get('/', auth, authorize('manage_coupons'), ctrl.getAll);
router.post('/', auth, authorize('manage_coupons'), ctrl.create);
router.put('/:id', auth, authorize('manage_coupons'), ctrl.update);
router.delete('/:id', auth, authorize('manage_coupons'), ctrl.delete);
module.exports = router;
