import type { Response } from "express";
import pool from "../config/db.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { getMessaging } from "firebase-admin/messaging";
import app from "../config/firebase.js";

export const createHoliday = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const {
            title,
            description,
            holiday_date
        } = req.body;

        await pool.query(
            `
            INSERT INTO holidays
            (title,description,start_date,created_by)
            VALUES(?,?,?,?)
            `,
            [
                title,
                description,
                holiday_date,
                req.user?.user_id
            ]
        );

        // get all users

        const [users]: any = await pool.query(
            "SELECT fcm_token FROM users WHERE fcm_token IS NOT NULL"
        );

        const tokens = users.map((u: any) => u.fcm_token);

        if(tokens.length){

            await getMessaging(app).sendEachForMulticast({

                tokens,

                notification:{
                    title:"New Holiday",
                    body:title
                },

                data:{
                    type:"holiday"
                }

            });

        }

        res.json({
            success:true
        });

    } catch(err){

        console.log(err);

        res.status(500).json(err);

    }

}

export const getHolidays = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        holiday_id,
        title,
        description,
        start_date,
        end_date,
        created_at
      FROM holidays
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching holidays:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch holidays",
    });
  }
};
export const getStudentHolidays = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        holiday_id,
        title,
        description,
        start_date,
        end_date,
        created_at
      FROM holidays
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching holidays:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch holidays",
    });
  }
};