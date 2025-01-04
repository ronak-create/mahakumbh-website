const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking_');
require('dotenv').config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_3zZF7ec60K3uFw",
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order for partial payment
router.post('/create-partial-order', async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_partial_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify and update partial payment
router.post('/verify-partial', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      const booking = await Booking.findById(bookingId);
      booking.partialPayment += booking.totalAmount * 0.25; // Add 25% of total amount
      if (booking.partialPayment >= booking.totalAmount) {
        booking.fullPayment = true;
        booking.status = 'Completed';
      }
      await booking.save();
      res.json({ success: true, message: 'Partial payment successful', booking });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: 'Payment verification failed' });
  }
});

// Create order for remaining payment
router.post('/create-remaining-order', async (req, res) => {
  try {
    const { bookingId, remainingAmount } = req.body;

    const options = {
      amount: remainingAmount * 100,
      currency: 'INR',
      receipt: `receipt_remaining_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify and update remaining payment
router.post('/verify-remaining', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      const booking = await Booking.findById(bookingId);
      booking.fullPayment = true;
      booking.status = 'Completed';
      await booking.save();
      res.json({ success: true, message: 'Remaining payment successful', booking });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: 'Payment verification failed' });
  }
});

module.exports = router;
