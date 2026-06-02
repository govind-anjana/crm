// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from './routes/indexRoute.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', indexRouter);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
    developer_message: 'Route not found',
    error_code: "Access forbidden",
  });
});
export default app;