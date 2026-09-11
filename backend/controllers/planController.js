const Plan = require('../models/Plan');
const slugify = require('slugify');

// @desc    Get active plans (Public)
// @route   GET /api/plans
// @access  Public
exports.getActivePlans = async (req, res, next) => {
  try {
    const plans = await Plan.find({ active: true }).sort({ order: 1, price: 1 }).lean();
    res.status(200).json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all plans (Admin)
// @route   GET /api/plans/admin
// @access  Private (Admin)
exports.getAllPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find().sort({ order: 1, price: 1 }).lean();
    res.status(200).json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private (Admin)
exports.createPlan = async (req, res, next) => {
  try {
    const { name, price, currency, description, features, badge, popular, active, order } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide plan name and price',
      });
    }

    let slug = slugify(name, { lower: true, strict: true });
    let existing = await Plan.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const plan = await Plan.create({
      name,
      slug,
      price: Number(price),
      currency: currency || 'INR',
      description: description || '',
      features: Array.isArray(features)
        ? features
        : typeof features === 'string'
        ? features.split('\n').map((f) => f.trim()).filter(Boolean)
        : [],
      badge: badge || '',
      popular: Boolean(popular),
      active: active !== undefined ? Boolean(active) : true,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing plan
// @route   PUT /api/plans/:id
// @access  Private (Admin)
exports.updatePlan = async (req, res, next) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    }
    if (req.body.features && typeof req.body.features === 'string') {
      req.body.features = req.body.features.split('\n').map((f) => f.trim()).filter(Boolean);
    }

    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Private (Admin)
exports.deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Plan deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
