const router = require('express').Router();
const { Car } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//get all cars
router.get('/', (req, res) => {
    Car.findAll()
      .then(dbCarData => res.json(dbCarData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;