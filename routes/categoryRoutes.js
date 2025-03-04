const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
// const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// router.post("/add", verifyToken, isAdmin, categoryController.createCategory);
// router.get("/all", categoryController.getCategories);
// router.put("/update/:id", verifyToken, isAdmin, categoryController.updateCategory);
// router.delete("/delete/:id", verifyToken, isAdmin, categoryController.deleteCategory);

// Create a new category
router.post("/add", categoryController.createCategory);

// Get all categories
router.get("/", categoryController.getCategories);

// Update a category
router.put("/update/:id", categoryController.updateCategory);

// Delete a category
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
