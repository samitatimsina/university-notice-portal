import pool from "../config/db.js";
import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

export const getUserProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const uid = req.user?.uid;

    const [rows] = await pool.query(
      `
      SELECT
        user_id,
        name,
        email,
        role,
        faculty,
        academic_level,
        profile_image,
        created_at
      FROM users
      WHERE firebase_uid = ?
      `,
      [uid]
    );

    const user = (rows as any[])[0];
    console.log("User from MySQL:", user);

    if (!user) {
       res.status(404).json({
        message: "User not found",
      });
      return;
    }

    return res.json({
      user,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to load profile",
    });

  }
};

export const uploadProfileImage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const firebaseUid = req.user?.uid;

    await pool.query(
      `
      UPDATE users
      SET profile_image=?
      WHERE firebase_uid=?
      `,
      [req.file.filename, firebaseUid]
    );

    return res.json({
      message: "Profile image updated.",
      image: req.file.filename,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};