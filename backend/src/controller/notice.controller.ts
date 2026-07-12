import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import pool from "../config/db.js";
import { getMessaging } from "firebase-admin/messaging";
import app from "../config/firebase.js";
import type { ResultSetHeader } from "mysql2";

export const Notices = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        notice_id,
        title,
        description,
        faculty,
        priority,
        academic_level,
        category,
        attachment,
        created_at,
        created_by
      FROM notices
      ORDER BY notice_id ASC
    `);
    return res.json(rows);
    
  } catch (error) {
    console.error(error);

     res.status(500).json({
      message: "Failed to fetch notices",
    });
    return;
  }
  
};
export const createNotices = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const messaging = getMessaging(app);
    const {
    title,
    description,
    category,
    faculty,
    academic_level,
    priority,
} = req.body;
const createdBy = req.user?.user_id;
if (!createdBy) {
    return res.status(401).json({
        message: "User not authenticated"
    });
}
const attachment = req.file
  ? `/uploads/notices/${req.file.filename}`
  : null;
    const [rows] = await pool.query<ResultSetHeader>(`
      INSERT INTO notices
      (
      title,
      description,
      category,
      faculty,
      academic_level,
      priority,
      attachment,
      created_by
      )
      VALUES (?,?,?,?,?,?,?,?)
          `,
        [
    title,
    description,
    category,
    faculty,
    academic_level,
    priority,
    attachment,
    createdBy
    
]
);
const noticeId = rows.insertId;
const [userRows] = await pool.query(
  `
  SELECT fcm_token
FROM users
WHERE faculty = ?
  AND academic_level = ?
  AND fcm_token IS NOT NULL
    AND fcm_token <> ''
  `,[faculty, academic_level]
);
const tokens = (userRows as any[])
  .map((user) => user.fcm_token)
  .filter(Boolean);

  if (tokens.length > 0) {
 const response = await messaging.sendEach(
  tokens.map((token) => ({
    token,
    notification: {
    },
    data: {
      title,
      body: description,
      type: "notice",
      url: `/student/notices/${noticeId}`,
      noticeTitle: title,
    },
  }))
);
response.responses.forEach((result, index) => {
  if (!result.success) {
    console.error(
      `Token ${index} failed:`,
      result.error?.code,
      result.error?.message
    );
  }
});
}
        console.log("Notice created successfully");
        
    return res.json(rows);
    
  } catch (error) {
    console.error(error);

     res.status(500).json({
      message: "Failed to fetch notices",
    });
    return;
  }
  
};

export const getNoticeById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        notice_id,
        title,
        description,
        faculty,
        academic_level,
        category,
        priority,
        attachment,
        created_at,
        created_by
      FROM notices
      WHERE notice_id = ?
      `,
      [id]
    );

    const notice = (rows as any[])[0];

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    return res.json({
      notice,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch notice",
    });
  }
};

export const getNoticeStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

const [noticeRows] = await pool.query(
  `
  SELECT faculty, academic_level
  FROM notices
  WHERE notice_id = ?
  `,
  [id]
);

const notice = (noticeRows as any[])[0];

if (!notice) {
  return res.status(404).json({
    message: "Notice not found",
  });
}

    // // Check notice exists
    // const [rows] = await pool.query(
    //   `SELECT notice_id FROM notice_read WHERE notice_id = ?`,
    //   [id]
    // );

    // if ((rows as any[]).length === 0) {
    //   return res.status(404).json({
    //     message: "Notice not found",
    //   });
    // }

    // Count targeted users
  const [userRows] = await pool.query(
  `
  SELECT COUNT(*) AS totalUsers
  FROM users
  WHERE faculty = ?
    AND academic_level = ?
  `,
  [notice.faculty, notice.academic_level]
);

const totalUsers = (userRows as any[])[0].totalUsers;

const [readRows] = await pool.query(
  `
  SELECT COUNT(*) AS readCount
  FROM notice_read
  WHERE notice_id = ?
  `,
  [id]
);

const readCount = (readRows as any[])[0].readCount;

    return res.json({
      stats: {
        totalUsers,
        delivered: totalUsers,
        read: readCount,
        unread: Math.max(totalUsers - readCount, 0)
      },
    });
  } catch (error) {
    console.error(error);
    

    return res.status(500).json({
      message: "Failed to fetch statistics",
    });
  }
};

export const deleteNotice = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Check if the notice exists
    const [existing] = await pool.query(
      `
      SELECT notice_id
      FROM notices
      WHERE notice_id = ?
      `,
      [id]
    );

    if ((existing as any[]).length === 0) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    // Delete the notice
    const [result] = await pool.query<ResultSetHeader>(
      `
      DELETE FROM notices
      WHERE notice_id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Failed to delete notice",
      });
    }

    return res.status(200).json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const markNoticeAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const firebaseUid = req.user?.uid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Find logged-in user
    const [userRows] = await pool.query(
      `
      SELECT user_id
      FROM users
      WHERE firebase_uid = ?
      `,
      [firebaseUid]
    );

    const user = (userRows as any[])[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if already marked as read
    const [existing] = await pool.query(
      `
      SELECT id
      FROM notice_read
      WHERE notice_id = ?
      AND user_id = ?
      `,
      [id, user.user_id]
    );

    if ((existing as any[]).length > 0) {
      return res.json({
        message: "Already marked as read",
      });
    }

    // Insert read record
    await pool.query(
      `
      INSERT INTO notice_read
      (
        notice_id,
        user_id
      )
      VALUES (?, ?)
      `,
      [id, user.user_id]
    );

    return res.json({
      message: "Notice marked as read",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getStudentNoticeById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Get logged-in student
    const [userRows] = await pool.query(
      `
      SELECT faculty, academic_level
      FROM users
      WHERE firebase_uid = ?
      `,
      [uid]
    );

    const user = (userRows as any[])[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Fetch only if the notice belongs to this student
    const [rows] = await pool.query(
      `
      SELECT
        notice_id,
        title,
        description,
        category,
        faculty,
        academic_level,
        priority,
        attachment,
        created_at,
        created_by
      FROM notices
      WHERE notice_id = ?
        AND faculty = ?
     AND academic_level = ?
      `,
      [ id, user.faculty, user.academic_level]
    );

    const notice = (rows as any[])[0];

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    return res.status(200).json({
      notice,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch notice",
    });
  }
};

export const StudentNotices = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Get logged-in student
    const [userRows] = await pool.query(
      `
      SELECT faculty, academic_level
      FROM users
      WHERE firebase_uid = ?
      `,
      [uid]
    );

    const user = (userRows as any[])[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get notices for this student
    const [rows] = await pool.query(
      `
      SELECT
        notice_id,
        title,
        description,
        faculty,
        priority,
        academic_level,
        category,
        attachment,
        created_at,
        created_by
      FROM notices
      WHERE
    faculty = 'all'
OR (
    faculty = ?
    AND academic_level IS NULL
)
OR (
    faculty = ?
    AND academic_level = ?
)
      `,
      [user.faculty, user.faculty, user.academic_level]
    );

    return res.json(rows);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch notices",
    });
  }
};
