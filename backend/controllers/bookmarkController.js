const Bookmark = require('../models/Bookmark');
const Content = require('../models/Content');
const User = require('../models/User');

// @desc    Toggle bookmark for user
// @route   POST /api/bookmarks/:contentId
// @access  Private
exports.toggleBookmark = async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const userId = req.user._id;

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    const existingBookmark = await Bookmark.findOne({ userId, contentId });

    if (existingBookmark) {
      await existingBookmark.deleteOne();
      await User.findByIdAndUpdate(userId, { $pull: { bookmarks: contentId } });
      await Content.findByIdAndUpdate(contentId, { $inc: { bookmarkCount: -1 } });

      return res.status(200).json({
        success: true,
        bookmarked: false,
        message: 'Bookmark removed',
      });
    } else {
      await Bookmark.create({ userId, contentId });
      await User.findByIdAndUpdate(userId, { $addToSet: { bookmarks: contentId } });
      await Content.findByIdAndUpdate(contentId, { $inc: { bookmarkCount: 1 } });

      return res.status(201).json({
        success: true,
        bookmarked: true,
        message: 'Content saved to bookmarks',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookmarks for logged-in user
// @route   GET /api/bookmarks
// @access  Private
exports.getUserBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id })
      .populate({
        path: 'contentId',
        populate: { path: 'category', select: 'name slug icon' },
      })
      .sort({ createdAt: -1 })
      .lean();

    const formatted = bookmarks
      .filter((b) => b.contentId != null)
      .map((b) => ({
        bookmarkId: b._id,
        savedAt: b.createdAt,
        content: b.contentId,
      }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      bookmarks: formatted,
    });
  } catch (error) {
    next(error);
  }
};
