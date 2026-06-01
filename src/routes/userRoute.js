import express from 'express'
const router = express.Router();
import { createUser, deleteUser, getAllUsers, getUserById, login, updateUser } from '../controllers/userController.js'
import { auth, isAdmin } from '../middleware/authMiddleware.js';

// Public routes
router.post("/login", login);

// Protected routes (auth required)
router.post('/',auth,isAdmin, createUser);
router.get("/", auth, isAdmin, getAllUsers);
router.get("/:id",  getUserById);
router.put("/:id", auth, isAdmin, updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);

export default router
