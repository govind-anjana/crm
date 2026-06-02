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

router.post("/", auth, isAdmin, createCategory);

router.get("/", auth, getAllCategories);

router.get("/:id", auth, getCategoryById);

router.put("/:id", auth, isAdmin, updateCategory);

router.delete("/:id", auth, isAdmin, deleteCategory);

export default router