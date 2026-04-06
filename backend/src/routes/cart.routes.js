const router = require('express').Router();
const ctrl = require('../controllers/cart.controller');
const { auth } = require('../middleware/auth.middleware');
router.get('/', auth, ctrl.getCart);
router.post('/items', auth, ctrl.addItem);
router.put('/items/:id', auth, ctrl.updateItem);
router.delete('/items/:id', auth, ctrl.removeItem);
router.delete('/', auth, ctrl.clearCart);
module.exports = router;
