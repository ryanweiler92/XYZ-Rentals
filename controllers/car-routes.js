const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car, Review } = require('../models');
const withAuth = require('../utils/auth');

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

  // see one reviews 
  router.get('/review/:id', withAuth, (req, res) => {
      Car.findOne({
          include: [{
              model: Review,
              attributes: [
              'condition', 
              'odor', 
              'comfort', 
              'tech', 
              'review', 
              'user_id', 
              'car_id',
              ],
              include: {
                  model: Car,
                  attributes: [
                      'make', 
                      'model', 
                      'year',
                      'image']
              } 
          }
        ]   
      })
      .then(dbCarData => {         
              const reviews = dbCarData.get({ plain: true });

              res.render('one-review', {
                reviews,
                loggedIn: req.session.loggedIn
              });                        
      })
      .catch(err => {
          res.status(500).json(err);
      })
  })

  module.exports = router;