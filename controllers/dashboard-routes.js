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

  // NEED TO FINISH
  router.put('edit/:id', withAuth, (req, res) => {
    Review.update({
        dents: req.body.dents,
        scratches: req.body.scratches,
        odor: req.body.odor,
        stains: req.body.stains,
        overall_rating: req.body.overall_rating,
        review: req.body.review,        
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(404).json({ message: 'No review found!'});
            return;
        }        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

  module.exports = router;
