const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "b017efd34a7ee993bdea34db845ce9a0e0d6e0ad4c0af51d6bff56fc3ffd892e";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    // console.log(newUser);
    // Save the user to the database
    await newUser.save();
    // console.log(JWT_SECRET)
    // Generate a token (optional, if you want to auto-login after registration)
    const token = jwt.sign(
      { userId: newUser._id},
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send user data and the token
    res.status(201).json({
      user: { email: newUser.email},
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password matches the one stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token without 'role' in the payload
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    // Return the token and a success message
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});
module.exports = router;