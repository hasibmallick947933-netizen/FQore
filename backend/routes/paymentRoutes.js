const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getOrders,
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public checkout endpoints
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

// Admin transaction logs
router.get('/orders', protect, authorize('admin'), getOrders);

module.exports = router;
