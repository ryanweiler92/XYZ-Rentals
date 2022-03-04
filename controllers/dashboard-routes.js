const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car, Review, User } = require('../models');
const withAuth = require('../utils/auth');

// get all reviews for dashboard
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Review.findAll({
        where: {
          user_id: req.session.user_id
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
        'created_at'
      ],
      include: [
        {
          model: Car,
          attributes: ['id', 'make', 'model', 'year', 'type', 'image', ],
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const reviews = dbPostData.map(review => review.get({ plain: true }));
        res.render('dashboard', { reviews, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;
