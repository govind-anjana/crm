import express from 'express'
const router = express.Router();
import userRouter from './userRoute.js';
import categoryRouter from './categoryRoute.js';


// router.use('/categories', categoryRouter);
router.use('/users', userRouter);  
export default router