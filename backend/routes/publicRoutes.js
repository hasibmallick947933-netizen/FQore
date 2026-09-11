const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/authMiddleware');

// Newsletter subscription
router.post('/newsletter/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ success: true, message: 'You are already subscribed!' });
    }

    await Subscriber.create({ email: email.toLowerCase() });
    res.status(201).json({ success: true, message: 'Successfully subscribed to financial briefings!' });
  } catch (err) {
    next(err);
  }
});

// Contact message submission
router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and message' });
    }

    const contact = await Contact.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been delivered to our advisory team.',
      contact,
    });
  } catch (err) {
    next(err);
  }
});

// Admin view contacts
router.get('/contact/messages', protect, authorize('admin'), async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
