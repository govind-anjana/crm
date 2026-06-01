// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin Access Required",
    });
  }

  next();
};

export const isCaller = (req, res, next) => {
  if (req.user.role !== "caller") {
    return res.status(403).json({
      success: false,
      message: "Caller Access Required",
    });
  }

  next();
};