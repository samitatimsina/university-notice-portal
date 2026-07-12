import type { Request, Response, NextFunction } from "express";
import "../config/firebase.js";
import { getAuth  } from "firebase-admin/auth";
import type {DecodedIdToken} from "firebase-admin/auth";

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Missing Authorization header",
      });
    }

    const token = authHeader.split(" ")[1] ;
    if (!token) {
      return res.status(401).json({
        message: "Missing token",
      });
    }

    const decoded = await getAuth().verifyIdToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("verifyToken error:", err);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};