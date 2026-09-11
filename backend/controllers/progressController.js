const Progress = require('../models/Progress');
const Content = require('../models/Content');

// @desc    Update progress for content item
// @route   POST /api/progress/:contentId
// @access  Private
exports.updateProgress = async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const { percent, completed } = req.body;
    const userId = req.user._id;

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    const progressPercent = Math.min(100, Math.max(0, parseInt(percent, 10) || 0));
    const isCompleted = completed !== undefined ? Boolean(completed) : progressPercent >= 90;

    let progress = await Progress.findOneAndUpdate(
      { userId, contentId },
      {
        progressPercent,
        completed: isCompleted,
        lastAccessed: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user learning progress
// @route   GET /api/progress
// @access  Private
exports.getUserProgress = async (req, res, next) => {
  try {
    const records = await Progress.find({ userId: req.user._id })
      .populate({
        path: 'contentId',
        select: 'title slug thumbnail contentType category readTimeMinutes',
        populate: { path: 'category', select: 'name slug' },
      })
      .sort({ lastAccessed: -1 })
      .lean();

    const validRecords = records.filter(r => r.contentId != null);

    res.status(200).json({
      success: true,
      count: validRecords.length,
      progress: validRecords,
    });
  } catch (error) {
    next(error);
  }
};
