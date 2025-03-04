const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Ensure this line is present

app.use("/api/admins", require("./routes/adminRoutes")); // Updated admin routes


app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
