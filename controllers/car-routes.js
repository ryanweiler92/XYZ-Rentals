const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car } = require('../models');

//get all cars
router.get('/', (req, res) => {
    Car.findAll({
        attribues: [
            'id',
            'make',
            'model',
            'year',
            'color',
            'type',
            'image'
        ]
    })
    .then(dbCarData => {
        const cars = dbCarData.map(car => car.get({ plain: true }));

        res.render('cars', {
            cars,
            loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;