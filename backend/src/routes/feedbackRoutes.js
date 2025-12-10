const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.get('/:id/dish', feedbackController.getDishFeedback);
router.get('/:id/staff', feedbackController.getStaffFeedback);
router.post('/', feedbackController.createFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
