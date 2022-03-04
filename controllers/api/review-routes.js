const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Review.findAll()
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    Review.create({
        dents: req.body.dents,
        scratches: req.body.scratches,
        odor: req.body.odor,
        stains: req.body.stains,
        overall_rating: req.body.overall_rating,
        review: req.body.review,
        user_id: req.body.user_id,
        // user_id: req.session.user_id,
        car_id: req.body.car_id
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;