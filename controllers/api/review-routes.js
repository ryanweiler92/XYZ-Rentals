const router = require('express').Router();
const { Review, Car, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all reviews
router.get('/', (req, res) => {
    Review.findAll()
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//get review by id
router.get('/:id', (req, res) => {
    Review.findOne({
      where: {
        id: req.params.id
      },
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
    .then(dbReviewData => res.json(dbReviewData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
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