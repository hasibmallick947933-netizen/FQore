const express = require('express');
const router = express.Router();
const {
  updateProgress,
  getUserProgress,
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getUserProgress);
router.post('/:contentId', updateProgress);

module.exports = router;
