const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // Ensure this model is correct
require("dotenv").config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://krishnajayanth24:NqqzTBJK8SgRuoIK@craftsdatabase.ih3ml.mongodb.net/?retryWrites=true&w=majority&appName=craftsDatabase";

const createAdmin = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists. Exiting...");
      mongoose.connection.close();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create new admin
    const admin = new Admin({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin created successfully");

  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    // Close DB connection
    mongoose.connection.close();
  }
};

// Run the function
createAdmin();
