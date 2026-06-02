// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware to authenticate a user using a JWT token.
 * It checks the 'authorization' header, verifies the token, and attaches the decoded user payload to `req.user`.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        developer_message: "No token provided",
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
      developer_message: "Token is invalid or has expired",
    });
  }
};

/**
 * Middleware to check if the authenticated user has the 'admin' role.
 * Assumes `req.user` has been populated by the `auth` middleware.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin Access Required",
      developer_message: "User is not an admin",
    });
  }

  next();
};

/**
 * Middleware to check if the authenticated user has the 'caller' role.
 * Assumes `req.user` has been populated by the `auth` middleware.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const isCaller = (req, res, next) => {
  if (req.user.role !== "caller") {
    return res.status(403).json({
      success: false,
      message: "Caller Access Required",
      developer_message: "User is not a caller",
    });
  }

  next();
};