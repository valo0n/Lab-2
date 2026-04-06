const router = require('express').Router();
const ctrl = require('../controllers/newsletter.controller');
router.post('/subscribe', ctrl.subscribe);
router.post('/unsubscribe', ctrl.unsubscribe);
module.exports = router;
