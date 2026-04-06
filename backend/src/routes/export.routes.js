const router = require('express').Router();
const ctrl = require('../controllers/export.controller');
const { auth, authorize } = require('../middleware/auth.middleware');
router.get('/:entity', auth, authorize('view_reports'), ctrl.exportData);
module.exports = router;
