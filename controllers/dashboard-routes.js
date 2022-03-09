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

  //edit review
  router.get('/edit/:id', withAuth, (req, res) => {
    Review.findByPk(req.params.id, {
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
          attributes: ['id', 'make', 'model', 'year', 'type', 'image']
        }
      ]
    })
      .then(dbReviewData => {
        const review = dbReviewData.get({ plain: true });

        res.render('edit-review', {
            review,
            loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // router.delete('/edit/:id', withAuth, (req, res) => {
  //   console.log('id', req.params.id);
  //   Review.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(dbReviewData => {
  //       if (!dbReviewData) {
  //         res.status(404).json({ message: 'No review found with this id' });
  //         return;
  //       }
  //       res.json(dbReviewData);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // });


  module.exports = router;
