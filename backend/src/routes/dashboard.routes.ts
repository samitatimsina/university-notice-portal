import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { getDashboardStats } from "../controller/dashboard.controller.js";

const router = Router();

router.get("/dashboard/stats",verifyToken,verifyAdmin,getDashboardStats);

export default router;