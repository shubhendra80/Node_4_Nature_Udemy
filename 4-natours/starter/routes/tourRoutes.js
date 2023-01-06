const express = require('express');
const tourController = require('../controllers/tourControllers.js');

const router = express.Router();

// router.param('id', tourController.varifyId);
router.route('/get-top-5-cheapest-tour')
.get(tourController.addParamsForAlias,tourController.getTours)

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/')
.get(tourController.getTours)
.post(
    // tourController.checkBody,
    tourController.addTour);

router.route('/:id')
.get(tourController.getTourByID)
.post(tourController.updateTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;