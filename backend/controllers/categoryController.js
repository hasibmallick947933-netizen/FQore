const Category = require('../models/Category');
const Content = require('../models/Content');
const slugify = require('slugify');

// @desc    Get all categories with content count
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1, name: 1 }).lean();

    // Attach content counts dynamically
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Content.countDocuments({ category: cat._id, published: true });
        return { ...cat, contentCount: count };
      })
    );

    res.status(200).json({
      success: true,
      count: categoriesWithCount.length,
      categories: categoriesWithCount,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by slug
// @route   GET /api/categories/:slug
// @access  Public
exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category '${req.params.slug}' not found`,
      });
    }

    const contentCount = await Content.countDocuments({ category: category._id, published: true });

    res.status(200).json({
      success: true,
      category: {
        ...category.toObject(),
        contentCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, icon, image, parentCategory, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category name',
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A category with this name already exists',
      });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      icon,
      image,
      parentCategory: parentCategory || null,
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
exports.updateCategory = async (req, res, next) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const linkedContentCount = await Content.countDocuments({ category: category._id });
    if (linkedContentCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category: it is currently referenced by ${linkedContentCount} educational posts. Reassign or delete those posts first.`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
