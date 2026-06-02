import express from 'express'
const router = express.Router();
import { createUser, deleteUser, getAllUsers, getUserById, login, updateUser } from '../controllers/userController.js'
import { auth, isAdmin } from '../middleware/authMiddleware.js';

// ========================================
// Public routes
// ========================================
// Route to handle user login and generate JWT
router.post("/login", login);

// ========================================
// Protected routes (auth required)
// ========================================
// Route to create a new user (Admin only)
router.post('/',auth,isAdmin, createUser);

// Route to get all users (Admin only)
router.get("/", auth, isAdmin, getAllUsers);

// Route to get a specific user by ID (Accessible to any authenticated user)
router.get("/:id",  getUserById);

// Route to update a user by ID (Admin only)
router.put("/:id", auth, isAdmin, updateUser);

// Route to delete a user by ID (Admin only)
router.delete("/:id", auth, isAdmin, deleteUser);

export default router
