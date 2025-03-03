const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const adminAuth = require("../middleware/adminAuth");

require("dotenv").config();

const router = express.Router();

// // Get all users (Admin only)
// router.get("/", adminAuth, async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Update user (Admin only)
// router.put("/:id", adminAuth, async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Delete user (Admin only)
// router.delete("/:id", adminAuth, async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// User Registration
// router.post("/register", async (req, res) => {
//   try {
//     const { firstName, lastName, category, mobile, email, password } = req.body;

//     // Validate required fields
//     if (
//       !firstName ||
//       !lastName ||
//       !category ||
//       !mobile ||
//       !email ||
//       !password
//     ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const newUser = new User({
//       firstName,
//       lastName,
//       gender,
//       age,
//       height,
//       color,
//       weight,
//       category,
//       subcategory, 
//       mobile,
//       email,
//       password: hashedPassword,
//       youtubeLink,
//       facebookLink,
//       instagramLink,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      age,
      height,
      color,
      weight,
      category,
      subcategory,
      mobile,
      email,
      password,
      youtubeLink,
      facebookLink,
      instagramLink,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !age ||
      !height ||
      !color ||
      !weight ||
      !category ||
      !mobile ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      gender,
      age,
      height,
      color,
      weight,
      category,
      subcategory: subcategory || "", // Ensure it's an empty string if not provided
      mobile,
      email,
      password: hashedPassword,
      youtubeLink: youtubeLink || "", // Set empty string if not provided
      facebookLink: facebookLink || "",
      instagramLink: instagramLink || "",
    });

    // Save user to database
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { category, email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email, category });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get all registered users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send users as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user details by ID
router.put("/users/:id", async (req, res) => {
  try {
    const { firstName, lastName, category, mobile, email } = req.body;

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, category, mobile, email },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete user by ID
router.delete("/users/:id", async (req, res) => {
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

// Health Check Route
router.get("/health", (req, res) => {
  res.json({ message: "24 Crafts Backend is running successfully!" });
});

module.exports = router;
