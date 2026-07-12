import Router from "express";
import { createEvent, getEvents, getStudentEvents } from "../controller/event.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/student/event", verifyToken, getStudentEvents);
router.get("/admin/event", verifyToken,verifyAdmin, getEvents);
router.post("/admin/event/create", verifyToken,verifyAdmin, createEvent);

export default router;
