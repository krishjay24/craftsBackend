const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();
const adminAuth = require("../middleware/adminAuth"); // Ensure adminAuth middleware is implemented
const User = require("../models/User"); // Ensure the correct path to your User model

const router = express.Router();

// Admin Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(400).json({ message: "Admin not found" });
//     }

//     console.log("Stored Hashed Password:", admin.password); // Debugging

//     // Compare password
//     const isMatch = await bcrypt.compare(password, admin.password);
    
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       process.env.JWT_SECRET || "defaultSecretKey",
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// GET all admins (for testing)
// router.get("/", async (req, res) => {
//   try {
//     const admins = await Admin.find(); // Fetch all admins
//     res.json(admins); // Return as JSON
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });


// Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    console.log("Stored Hashed Password:", admin.password); // Debugging

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all admins (Admin Only)
router.get("/admins", adminAuth, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all users (Admin Only)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user (Admin Only)
router.put("/users/:id", adminAuth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete user (Admin Only)
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
