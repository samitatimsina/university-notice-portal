import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.js";
import pool from "../config/db.js";

export const verifyAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user?.uid;

    const [rows] = await pool.query(
      `SELECT role FROM users WHERE firebase_uid = ?`,
      [uid]
    );

    const user = (rows as any[])[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }  
    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};