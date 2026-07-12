import { Router } from "express";
import { createNotices, Notices, getNoticeById, getStudentNoticeById,
  getNoticeStats,
  deleteNotice,markNoticeAsRead, 
  StudentNotices} from "../controller/notice.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/admin/notices/create", verifyToken,verifyAdmin, createNotices);
router.get("/admin/notices",verifyToken,verifyAdmin, Notices);
router.get("/student/notices",verifyToken, StudentNotices);

router.get(
  "/admin/notices/:id",
  verifyToken,
  verifyAdmin,
  getNoticeById
);

router.get(
  "/student/notices/:id",
  verifyToken,
  getStudentNoticeById
);

router.get(
  "/admin/notices/:id/stats",
  verifyToken,
  verifyAdmin,
  getNoticeStats
);

router.delete(
  "/admin/notices/:id",
  verifyToken,
  verifyAdmin,
  deleteNotice
);

// router.post(
//   "/admin/notices/:id/resend",
//   verifyToken,
//   verifyAdmin,
//   resendNotice
// );

router.post(
  "/student/notices/:id/read",
  verifyToken,
  markNoticeAsRead
);

export default router;