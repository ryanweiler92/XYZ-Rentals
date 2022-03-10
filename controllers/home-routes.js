const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car, Review, User } = require('../models');

//get all reviews
router.get('/', (req, res) => {
    Review.findAll({
        attribues: [
            'id',
            'dents',
            'scratches',
            'odor',
            'stains',
            'overall_rating',
            'review',
            'user_id',
            'car_id',
            'created_at'
        ],
        include: [
            {
            model: Car,
            attributes: ['id', 'make', 'model', 'year', 'color', 'type', 'image'],
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
        order: [
          ['created_at', 'DESC']
        ]
    })
    .then(dbReviewData => {
        const reviews = dbReviewData.map(review => review.get({ plain: true }));

        res.render('homepage', {
            reviews,
            loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

module.exports = router;