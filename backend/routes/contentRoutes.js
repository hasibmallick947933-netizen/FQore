const express = require('express');
const router = express.Router();
const {
  getContentList,
  getContentBySlug,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  togglePublish,
  getResources,
} = require('../controllers/contentController');
const { protect, authorize, optionalAuth } = require('../middleware/authMiddleware');

// Dedicated resource query
router.get('/resources/all', getResources);

// Public list with optional token (to show drafts if admin)
router.route('/')
  .get(optionalAuth, getContentList)
  .post(protect, authorize('admin'), createContent);

// Slug access
router.route('/:slug')
  .get(optionalAuth, getContentBySlug);

// Admin ID access and mutations
router.route('/id/:id')
  .get(protect, authorize('admin'), getContentById)
  .put(protect, authorize('admin'), updateContent)
  .delete(protect, authorize('admin'), deleteContent);

// Admin publish toggle
router.patch('/id/:id/publish', protect, authorize('admin'), togglePublish);

module.exports = router;
