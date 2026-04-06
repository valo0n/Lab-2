const router = require('express').Router();
const ctrl = require('../controllers/compare.controller');
const { auth } = require('../middleware/auth.middleware');
router.get('/', auth, ctrl.getAll);
router.post('/', auth, ctrl.add);
router.delete('/:productId', auth, ctrl.remove);
module.exports = router;
