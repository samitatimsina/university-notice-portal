import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import pool from "../config/db.js";
import { getAuth } from "firebase-admin/auth";

export const getUsers = async (
  req: AuthRequest,
  res: Response
) => {
    console.log("getUsers called");
  try {
    const [rows] = await pool.query(`
      SELECT
        user_id,
        firebase_uid,
        name,
        email,
        role,
        faculty,
        academic_level,
        phone
      FROM users
      ORDER BY user_id ASC
    `);
    return res.json(rows);
    
  } catch (error) {
    console.error(error);

     res.status(500).json({
      message: "Failed to fetch users",
    });
    return;
  }
};
