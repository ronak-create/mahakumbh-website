const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('../backend/routes/auth');
const bookingRoutes = require('../backend/routes/booking'); // Updated to use the new combined booking routes
const paymentRoutes = require('../backend/routes/payment');
// Remove getBookingRoutes and newBookingRoutes since they're now in bookingRoutes

// Initialize the app
const app = express();

app.use(cors({
  origin: ['http://localhost:3000',"http://localhost:5002"], // Update to the port your React app is running on
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes); // Now points to a combined booking route
app.use('/api/payment', paymentRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/MahaKumbh", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));