const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const carRoutes = require('./car-routes.js');
const reviewRoutes = require('./review-routes.js');

router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/reviews', reviewRoutes);


module.exports = router;