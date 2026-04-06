const router = require('express').Router();
const ctrl = require('../controllers/payment.controller');
const { auth } = require('../middleware/auth.middleware');
router.post('/create-intent', auth, ctrl.createIntent);
router.post('/webhook', require('express').raw({ type: 'application/json' }), ctrl.webhook);
router.get('/order/:orderId', auth, ctrl.getByOrder);
module.exports = router;
