import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const {
  MYSQLHOST,
  MYSQLPORT,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLDATABASE,
} = process.env;

if (!MYSQLHOST || !MYSQLPORT || !MYSQLUSER || !MYSQLPASSWORD || !MYSQLDATABASE) {
  throw new Error("Missing database environment variables.");
}

const pool = mysql.createPool({
  host: MYSQLHOST,
  port: parseInt(MYSQLPORT, 10), 
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;