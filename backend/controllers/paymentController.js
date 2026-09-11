const crypto = require('crypto');
const Razorpay = require('razorpay');
const Plan = require('../models/Plan');
const Order = require('../models/Order');

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (
    key_id &&
    key_secret &&
    key_id !== 'your_razorpay_key_id' &&
    !key_id.includes('simulation') &&
    !key_secret.includes('simulation')
  ) {
    return new Razorpay({
      key_id,
      key_secret,
    });
  }
  return null;
};

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Public
exports.createOrder = async (req, res, next) => {
  try {
    const { planId, contentId, customerEmail, customerName } = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'Please select a plan',
      });
    }

    const plan = await Plan.findById(planId);
    if (!plan || !plan.active) {
      return res.status(404).json({
        success: false,
        message: 'Selected plan is not available',
      });
    }

    const amountInPaise = Math.round(plan.price * 100);
    const currency = plan.currency || 'INR';

    const rzp = getRazorpayInstance();
    let orderId = '';
    let isSimulator = false;

    if (rzp) {
      try {
        const options = {
          amount: amountInPaise,
          currency,
          receipt: `edux_${Date.now()}`,
          notes: {
            planId: plan._id.toString(),
            planName: plan.name,
            contentId: contentId ? contentId.toString() : '',
            customerEmail: customerEmail || 'guest@eduxchain.com',
          },
        };
        const rzpOrder = await rzp.orders.create(options);
        orderId = rzpOrder.id;
      } catch (rzpErr) {
        console.warn('Razorpay live order creation failed, switching to sandbox simulation mode:', rzpErr.message);
        orderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        isSimulator = true;
      }
    } else {
      // Automatic Sandbox / Simulator Order ID if live keys not configured
      orderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      isSimulator = true;
    }

    const order = await Order.create({
      orderId,
      planId: plan._id,
      planName: plan.name,
      amount: plan.price,
      currency,
      status: 'created',
      customerEmail: customerEmail || '',
      customerName: customerName || 'Guest Learner',
      contentId: contentId || null,
    });

    res.status(200).json({
      success: true,
      orderId: order.orderId,
      amount: amountInPaise,
      displayPrice: plan.price,
      currency,
      planName: plan.name,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_simulation_mode',
      isSimulator,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay Payment Signature
// @route   POST /api/payments/verify
// @access  Public
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

    if (!razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required for verification',
      });
    }

    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order record not found',
      });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (secret && razorpay_signature && !razorpay_order_id.startsWith('order_sim_')) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        order.status = 'failed';
        await order.save();
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed: Signature mismatch',
        });
      }
    }

    const receiptToken = `unlock_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;

    order.status = 'paid';
    order.paymentId = razorpay_payment_id || `sim_pay_${Date.now()}`;
    order.receiptToken = receiptToken;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified and access unlocked successfully!',
      planName: order.planName,
      receiptToken,
      unlockedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders/transactions (Admin)
// @route   GET /api/payments/orders
// @access  Private (Admin)
exports.getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();
    const orders = await Order.find()
      .populate('planId', 'name price')
      .populate('contentId', 'title slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalRevenue = await Order.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
      orders,
    });
  } catch (error) {
    next(error);
  }
};
