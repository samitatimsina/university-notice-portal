import { getAuth } from "firebase-admin/auth";
import pool from "../config/db.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import type { Response } from "express";
export const registerUser = async (
    req: AuthRequest,
    res: Response
) => {

    const user_id = req.user?.uid;
    const email = req.user?.email;
    const {
      name,
      role,
      faculty,
      phone,
      academic_level,
    } = req.body;

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE firebase_uid=?",
        [user_id]
    );

    if ((rows as any[]).length > 0) {

         res.json();
        return;

    }

    await pool.query(
        `
        INSERT INTO users
        (
            firebase_uid,
            email,
             name,
        role,
        faculty,
        phone,
        academic_level
        )
        VALUES (?,?,?,?,?,?,?)
        `,
        [user_id, email, name,
        role,
        faculty,
        phone,
        academic_level,]
    );


    res.json();

};

export const updateFcmToken = async (
  req: AuthRequest,
  res: Response
) => {
  const uid = req.user?.uid;
  const { fcm_token } = req.body;

  await pool.query(
    "UPDATE users SET fcm_token = ? WHERE firebase_uid = ?",
    [fcm_token, uid]
  );

  return res.json({
    message: "FCM token updated successfully",
  });
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response
) => {
   const { firebase_uid } = req.body;
  try {
    const currentUid = req.user?.uid;
   

const [rows] = await pool.query(
  "SELECT role FROM users WHERE firebase_uid = ?",
  [currentUid]
);

const currentUser = (rows as any[])[0];

if (currentUser.role !== "Admin") {
  return res.status(403).json({
    message: "Only admins can delete users",
  });
}
  await getAuth().deleteUser(firebase_uid);
} catch (error: any) {
  if (error.code !== "auth/user-not-found") {
    throw error;
  }

  console.log(
    "User already deleted from Firebase. Removing from MySQL..."
  );
}

// Always delete from MySQL
await pool.query(
  "DELETE FROM users WHERE firebase_uid = ?",
  [firebase_uid]
);


return res.json({
  message: "User deleted successfully.",
});
}
export const getCurrentUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const firebaseUid = req.user?.uid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const [rows] = await pool.query(
      `
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
      WHERE firebase_uid = ?
      `,
      [firebaseUid]
    );
    const user = (rows as any[])[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await pool.query(
  `
  UPDATE users
  SET last_login = NOW()
  WHERE firebase_uid = ?
  `,
  [firebaseUid]
);

    return res.json(user);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
