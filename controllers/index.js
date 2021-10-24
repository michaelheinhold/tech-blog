const homeRoutes = require('./home-routes');
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;