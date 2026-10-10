import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  // TODO 1: user, password and database, the same way, from process.env
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});