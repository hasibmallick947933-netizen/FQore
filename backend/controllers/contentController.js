const Content = require('../models/Content');
const Category = require('../models/Category');
const slugify = require('slugify');

// @desc    Get all published or admin filtered content
// @route   GET /api/content
// @access  Public (filtered) / Private (Admin sees drafts)
exports.getContentList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    const query = {};

    // Only admin can see unpublished drafts
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin || req.query.publishedOnly === 'true') {
      query.published = true;
    } else if (req.query.published !== undefined) {
      query.published = req.query.published === 'true';
    }

    // Filter by category slug or ID
    if (req.query.category) {
      const categoryDoc = await Category.findOne({
        $or: [{ slug: req.query.category }, { _id: req.query.category.match(/^[0-9a-fA-F]{24}$/) ? req.query.category : null }]
      });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    // Filter by contentType
    if (req.query.contentType) {
      const types = req.query.contentType.split(',');
      query.contentType = { $in: types };
    }

    // Filter by featured
    if (req.query.featured !== undefined) {
      query.featured = req.query.featured === 'true';
    }

    // Filter by tag
    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    // Keyword Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Sorting
    let sort = { publishedAt: -1, createdAt: -1 };
    if (req.query.sortBy === 'popular') {
      sort = { views: -1, publishedAt: -1 };
    } else if (req.query.sortBy === 'oldest') {
      sort = { publishedAt: 1 };
    } else if (req.query.sortBy === 'title') {
      sort = { title: 1 };
    }

    const total = await Content.countDocuments(query);
    const content = await Content.find(query)
      .populate('category', 'name slug icon')
      .populate('author', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      count: content.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      content,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single content by slug & increment views
// @route   GET /api/content/:slug
// @access  Public
exports.getContentBySlug = async (req, res, next) => {
  try {
    const content = await Content.findOne({ slug: req.params.slug })
      .populate('category', 'name slug icon')
      .populate('author', 'name avatar bio');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    // If unpublished and user is not admin, deny
    const isAdmin = req.user && req.user.role === 'admin';
    if (!content.published && !isAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Content is not published',
      });
    }

    // Increment view count asynchronously
    await Content.findByIdAndUpdate(content._id, { $inc: { views: 1 } });

    // Find related content in same category
    const related = await Content.find({
      category: content.category ? content.category._id : null,
      _id: { $ne: content._id },
      published: true,
    })
      .select('title slug description thumbnail contentType views readTimeMinutes')
      .limit(4)
      .lean();

    res.status(200).json({
      success: true,
      content,
      related,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single content by ID (Admin)
// @route   GET /api/content/id/:id
// @access  Private (Admin)
exports.getContentById = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('category', 'name slug icon')
      .populate('author', 'name avatar');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create content
// @route   POST /api/content
// @access  Private (Admin)
exports.createContent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      content,
      contentType,
      category,
      subcategory,
      tags,
      thumbnail,
      mediaUrl,
      mediaDetails,
      externalUrl,
      featured,
      published,
      difficulty,
      structuredDetails,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = req.body;

    if (!title || !description || !contentType || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, contentType and category',
      });
    }

    let slug = slugify(title, { lower: true, strict: true });
    let existingSlug = await Content.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    // Estimate read time (avg 200 words per minute)
    const wordCount = content ? content.split(/\s+/).length : 0;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const newContent = await Content.create({
      title,
      slug,
      description,
      content: content || '',
      contentType,
      category,
      subcategory: subcategory || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      thumbnail: thumbnail || '',
      mediaUrl: mediaUrl || '',
      mediaDetails: mediaDetails || {},
      externalUrl: externalUrl || '',
      author: req.user._id,
      authorName: req.user.name || 'Admin',
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
      publishedAt: published ? new Date() : null,
      readTimeMinutes,
      difficulty: difficulty || 'Beginner',
      structuredDetails: structuredDetails || {},
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || description,
      seoKeywords: Array.isArray(seoKeywords) ? seoKeywords : (seoKeywords ? seoKeywords.split(',').map(k => k.trim()) : []),
    });

    res.status(201).json({
      success: true,
      content: newContent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private (Admin)
exports.updateContent = async (req, res, next) => {
  try {
    let content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    if (req.body.title && req.body.title !== content.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim());
    }

    if (req.body.content) {
      const wordCount = req.body.content.split(/\s+/).length;
      req.body.readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    }

    content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private (Admin)
exports.deleteContent = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    await content.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Content removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle publish status
// @route   PATCH /api/content/:id/publish
// @access  Private (Admin)
exports.togglePublish = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    content.published = !content.published;
    if (content.published && !content.publishedAt) {
      content.publishedAt = new Date();
    }
    await content.save();

    res.status(200).json({
      success: true,
      published: content.published,
      message: `Content is now ${content.published ? 'published' : 'draft'}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get downloadable/media resources
// @route   GET /api/content/resources/all
// @access  Public
exports.getResources = async (req, res, next) => {
  try {
    const { type, search, sort } = req.query;
    const query = {
      published: true,
      contentType: { $in: ['pdf', 'excel', 'csv', 'video', 'external_resource'] },
    };

    if (type && type !== 'all') {
      query.contentType = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { publishedAt: -1 };
    if (sort === 'popular') sortOption = { views: -1 };
    if (sort === 'title') sortOption = { title: 1 };

    const resources = await Content.find(query)
      .populate('category', 'name slug icon')
      .sort(sortOption)
      .lean();

    res.status(200).json({
      success: true,
      count: resources.length,
      resources,
    });
  } catch (error) {
    next(error);
  }
};
