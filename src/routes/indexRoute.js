import express from 'express'
const router = express.Router();
import userRouter from './userRoute.js';
import categoryRouter from './categoryRoute.js';
import leadRouter from './leadRoute.js';

// ========================================
// Main API Router Configuration
// ========================================
// Mount category routes under /categories prefix
router.use('/categories', categoryRouter);

// Mount user routes under /users prefix
router.use('/users', userRouter);  

// Mount lead routes under /leads prefix
router.use('/leads', leadRouter);
export default router