import type { Response } from "express";
import pool from "../config/db.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { getMessaging } from "firebase-admin/messaging";
import app from "../config/firebase.js";

export const createEvent = async (
    req: AuthRequest,
    res: Response
)=>{

    try{

        const{
            title,
            description,
            venue,
            event_date,
            event_time
        }=req.body;

        await pool.query(

            `
            INSERT INTO events
            (
            title,
            description,
            venue,
            event_date,
            event_time,
            created_by
            )
            VALUES(?,?,?,?,?,?)
            `,

            [
                title,
                description,
                venue,
                event_date,
                event_time,
                req.user?.user_id
            ]

        );

        const [users]:any = await pool.query(
            "SELECT fcm_token FROM users WHERE fcm_token IS NOT NULL"
        );

        const tokens = users.map((u:any)=>u.fcm_token);

        if(tokens.length){

            await getMessaging(app).sendEachForMulticast({

                tokens,

                notification:{
                    title:"New Event",
                    body:title
                },

                data:{
                    type:"event"
                }

            });

        }

        res.json({
            success:true
        });

    }

    catch(err){

        res.status(500).json(err);

    }

}

export const getEvents = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        event_id,
        title,
        description,
        venue,
        event_date,
        event_time,
        image,
        created_at
      FROM events
      ORDER BY event_date ASC, event_time ASC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};
export const getStudentEvents = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        event_id,
        title,
        description,
        venue,
        event_date,
        event_time,
        image,
        created_at
      FROM events
      ORDER BY event_date ASC, event_time ASC
      `
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};