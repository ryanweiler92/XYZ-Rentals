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
        condition: req.body.condition,
        odor: req.body.odor,
        comfort: req.body.comfort,
        tech: req.body.tech,
        review: req.body.review,
        user_id: req.session.user_id,
        car_id: req.body.car_id
    })
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Review.update({
        condition: req.body.condition,
        odor: req.body.odor,
        comfort: req.body.comfort,
        tech: req.body.tech,
        review: req.body.review,
        user_id: req.session.user_id,
        car_id: req.body.car_id
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