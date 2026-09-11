const express = require('express');
const router = express.Router();
const {
  uploadMedia,
  getMediaList,
  deleteMedia,
} = require('../controllers/mediaController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect, authorize('admin'));

router.route('/')
  .get(getMediaList);

router.post('/upload', upload.single('file'), uploadMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
