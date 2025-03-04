const Subcategory = require("../models/Subcategory");

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subcategory = new Subcategory({ name, category });
    await subcategory.save();
    res.status(201).json({ message: "Subcategory added successfully", subcategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category", "name");
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, { name, category }, { new: true });
    res.status(200).json({ message: "Subcategory updated", updatedSubcategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    res.status(200).json({ message: "Subcategory deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
