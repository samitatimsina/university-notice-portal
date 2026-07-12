import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createHoliday,
  getHolidays,
  getStudentHolidays,
} from "../controller/holiday.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/student/holiday", verifyToken, getStudentHolidays);
router.post("/admin/holiday/create", verifyToken,verifyAdmin, createHoliday);
router.get("/admin/holiday", verifyToken,verifyAdmin, getHolidays);

export default router;
