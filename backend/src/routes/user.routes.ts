import { Router } from "express";
import {
  registerUser,
  updateFcmToken,
  deleteUser,
  getCurrentUser,
} from "../controller/auth.controller.js";
import { getUsers } from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { getUserProfile } from "../controller/profile.controller.js"

const router=Router();

router.get("/admin/users", verifyToken,verifyAdmin, getUsers);
router.post("/registerusers",verifyToken,registerUser);
router.get("/me", verifyToken, getCurrentUser);
router.put(
  "/users/fcm-token",
  verifyToken,
  updateFcmToken
);

router.delete(
  "/admin/users",
  verifyToken,
  deleteUser
);

router.get(
    "/admin/profile",
    verifyToken,
    verifyAdmin,
    getUserProfile
);
router.get(
    "/student/profile",
    verifyToken,
    getUserProfile
);


export default router;