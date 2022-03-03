const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const carRoutes = require('./car-routes.js');

router.use('/', homeRoutes);
router.use('/cars', carRoutes);
router.use('/api', apiRoutes);

module.exports = router;