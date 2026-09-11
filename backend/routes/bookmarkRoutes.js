const express = require('express');
const router = express.Router();
const {
  toggleBookmark,
  getUserBookmarks,
} = require('../controllers/bookmarkController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getUserBookmarks);
router.post('/:contentId', toggleBookmark);

module.exports = router;
