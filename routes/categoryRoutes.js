const express = require("express");
const router = express.Router();
// Import controller methods
const {
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
  createCategory,
} = require("../controllers/CategoryController");


router.get("/allCategories", getAllCategories);
router.post("/createCategory", createCategory);
router.get("/getCategoryById", getCategoryById);
router.post("/updateCategory", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);



module.exports = router;
