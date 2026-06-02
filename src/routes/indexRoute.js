import express from 'express'
const router = express.Router();
import userRouter from './userRoute.js';
import categoryRouter from './categoryRoute.js';


// ========================================
// Main API Router Configuration
// ========================================
// Mount category routes under /categories prefix
router.use('/categories', categoryRouter);

// Mount user routes under /users prefix
router.use('/users', userRouter);  
export default router