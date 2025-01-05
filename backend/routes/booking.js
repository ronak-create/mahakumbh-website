const express = require('express');
const Booking = require('../models/Booking');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new booking
router.post('/', verifyToken, async (req, res) => {
  try {
    // Assuming you want to validate the incoming data
    const { name, phoneNumber, accommodationType, checkIn, adults, children } = req.body;
    if (!name || !phoneNumber || !accommodationType || !checkIn) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = new Booking({ 
      ...req.body, 
      user: req.user.id // Assuming req.user.id is the user's ID from the token
    });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// Get user bookings
router.get('/get-booking', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    console.log("booking", bookings);
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

module.exports = router;