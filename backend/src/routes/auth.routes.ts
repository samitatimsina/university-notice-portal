import { Router } from "express";
import { registerUser, updateFcmToken, getCurrentUser } from "../controller/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { deleteUser } from "../controller/auth.controller.js";

const router = Router();

router.get("/me", verifyToken, getCurrentUser);
router.post("/signup", verifyToken, registerUser);
router.put("/users/fcm-token", verifyToken, updateFcmToken);
router.delete(
  "/users/:user_id",
  verifyToken,
  deleteUser
);

export default router;