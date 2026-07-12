import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import pool from "../config/db.js";


export const getDashboardStats = async (
    req: AuthRequest,
    res: Response
) => {
    try{
        const [[totalUsers]]:any = await pool.query(
            `SELECT COUNT(*) AS totalUsers
            FROM users`
        );

        const [[activeUsers]]:any = await pool.query(
            `SELECT COUNT(*) AS activeUsers
            FROM users
            WHERE last_login >=NOW() - INTERVAL 30 DAY`
        );
        const [[inactiveUsers]]:any = await pool.query(
            `SELECT COUNT(*) AS inactiveUsers
            FROM users
            WHERE last_login IS NULL OR last_login < NOW() - INTERVAL 30 DAY`
        );

        res.json({
            totalUsers: totalUsers.totalUsers,
            activeUsers: activeUsers.activeUsers,
            inactiveUsers: inactiveUsers.inactiveUsers,
        });
    }catch(error) {
        console.error(error);

        res.status(500).json({
            message:"Failed to fetch dashboard statistics",
        });
    }

    };