const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");
// const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// router.post("/add", verifyToken, isAdmin, subcategoryController.createSubcategory);
// router.get("/all", subcategoryController.getSubcategories);
// router.put("/update/:id", verifyToken, isAdmin, subcategoryController.updateSubcategory);
// router.delete("/delete/:id", verifyToken, isAdmin, subcategoryController.deleteSubcategory);

// Create a new subcategory
router.post("/add", subcategoryController.createSubcategory);

// Get all subcategories
router.get("/", subcategoryController.getSubcategories);

// Update a subcategory
router.put("/update/:id", subcategoryController.updateSubcategory);

// Delete a subcategory
router.delete("/delete/:id", subcategoryController.deleteSubcategory);

module.exports = router;
