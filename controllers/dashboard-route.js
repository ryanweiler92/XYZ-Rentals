const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Car, Review } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Review.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'condition', 
            'odor', 
            'comfort', 
            'tech', 
            'review', 
            'user_id', 
            'car_id',
        ],
        include: Car,
        attributes: [
            'make', 
            'model', 
            'year',
            'image' 
        ],
        include: User,
        attributes: ['username']
    })
    .then(dbReviewData => {
        const reviews = dbReviewData.map(reviews.get({ plain: true }));

        res.render('dashboard', {
            reviews,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


module.exports = router;