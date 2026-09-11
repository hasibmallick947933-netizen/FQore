const Content = require('../models/Content');
const User = require('../models/User');
const Category = require('../models/Category');
const Media = require('../models/Media');

// @desc    Get admin statistics & metrics
// @route   GET /api/stats
// @access  Private (Admin)
exports.getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalContent,
      publishedContent,
      draftContent,
      totalMedia,
      categoriesCount,
    ] = await Promise.all([
      User.countDocuments(),
      Content.countDocuments(),
      Content.countDocuments({ published: true }),
      Content.countDocuments({ published: false }),
      Media.countDocuments(),
      Category.countDocuments(),
    ]);

    // Sum total views
    const viewsAggregation = await Content.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);
    const totalViews = viewsAggregation[0] ? viewsAggregation[0].totalViews : 0;

    // Content types count breakdown
    const typeBreakdown = await Content.aggregate([
      { $group: { _id: '$contentType', count: { $sum: 1 } } },
    ]);
    const contentTypeCounts = {};
    typeBreakdown.forEach((t) => {
      contentTypeCounts[t._id] = t.count;
    });

    // Popular content by views
    const popularContent = await Content.find({ published: true })
      .select('title slug contentType views bookmarkCount publishedAt')
      .sort({ views: -1 })
      .limit(5)
      .lean();

    // Recent content
    const recentContent = await Content.find()
      .select('title slug contentType published views createdAt')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    // Recent registered users
    const recentUsers = await User.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalContent,
        publishedContent,
        draftContent,
        totalViews,
        totalMedia,
        categoriesCount,
        contentTypeCounts,
        popularContent,
        recentContent,
        recentUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};
