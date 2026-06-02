import express from 'express'

import  {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import  { auth, isAdmin } from  "../middleware/authMiddleware.js";
const router = express.Router();

// ========================================
// Category Routes
// ========================================

// Route to create a new category (Admin only)
router.post("/", auth, isAdmin, createCategory);

// Route to get all categories (Accessible to any authenticated user)
router.get("/", auth, getAllCategories);

// Route to get a specific category by ID (Accessible to any authenticated user)
router.get("/:id", auth, getCategoryById);

// Route to update a category by ID (Admin only)
router.put("/:id", auth, isAdmin, updateCategory);

// Route to delete a category by ID (Admin only)
router.delete("/:id", auth, isAdmin, deleteCategory);

export default router