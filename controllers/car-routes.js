const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car, Review, User } = require('../models');
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

  // see one car reviews 
  router.get('/:id', withAuth, (req, res) => {
      Review.findAll({
          where: {
              car_id: req.params.id
          },
            attributes: [
                'id',
                'dents',
                'scratches',
                'odor',
                'stains',
                'overall_rating',
                'review',
                'user_id',
                'car_id',
              ],

          include: [
              {
                  model: Car,
                  attributes: [            
                  'id',
                  'make',
                  'model',
                  'year',
                  'color',
                  'type',
                  'image']                 
              },
              {
                  model: User,
                  attributes: [
                      'username'
                  ]
              }
        ],   
      })
      .then(dbReviewData => {         
              const reviews = dbReviewData.map(review => review.get({plain: true }));
              res.render('car-reviews', {
                reviews,
                loggedIn: req.session.loggedIn
              });                        
      })
      .catch(err => {
          console.log(err)
          res.status(500).json(err);
      })
  });

  //post new review
  router.get('/reviews/:id', withAuth, (req, res) => {
      Car.findByPk(req.params.id, {
          attributes: [
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
          if (dbCarData) {
              const car = dbCarData.get({ plain: true });

              res.render('submit-review', {
                  car,
                  loggedIn: true
              });
          } else {
              res.status(404).end();
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json(err)
      })
  })

  module.exports = router;