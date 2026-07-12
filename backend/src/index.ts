
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import pool from "./config/db.js";
import "./config/firebase.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    const connection = await pool.getConnection();

    console.log("✅ Connected to MySQL");

    connection.release();

    app.listen(5000, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed");
    console.error(error);
    process.exit(1);
  }
}

startServer();