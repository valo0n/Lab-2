const router = require('express').Router();
const ctrl = require('../controllers/notification.controller');
const { auth } = require('../middleware/auth.middleware');
router.get('/', auth, ctrl.getAll);
router.get('/unread-count', auth, ctrl.getUnreadCount);
router.put('/:id/read', auth, ctrl.markAsRead);
router.put('/read-all', auth, ctrl.markAllAsRead);
module.exports = router;
