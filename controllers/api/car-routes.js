const router = require('express').Router();
const { Car, User, Review } = require('../../models');
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

  router.get('/:id', (req, res) => {
    Car.findByPk(req.params.id, {
      include: [{
          model: Review,
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
          // include: {
          // model: User,
          // attributes: ['username'],
          include: {
              model: Car,
              attributes: [            
              'id',
              'make',
              'model',
              'year',
              'color',
              'type',
              'image']
          }
          }
        // }
    ]   
  })
      .then(dbCarData => {
        if(!dbCarData) {
          res.status(404).json({ messahe: 'No cars found!'});
          return;
        }
        res.json(dbCarData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



  

module.exports = router;