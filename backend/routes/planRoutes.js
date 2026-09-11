const express = require('express');
const router = express.Router();
const {
  getActivePlans,
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/planController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route to fetch active plans
router.get('/', getActivePlans);

// Admin route to fetch all plans (including inactive)
router.get('/admin', protect, authorize('admin'), getAllPlans);

// Admin mutations
router.post('/', protect, authorize('admin'), createPlan);
router.route('/:id')
  .put(protect, authorize('admin'), updatePlan)
  .delete(protect, authorize('admin'), deletePlan);

module.exports = router;
