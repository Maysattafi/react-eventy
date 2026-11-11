import { pool } from "../db.js";

export async function create({ eventId, userId, comment, rating }) {
  const [result] = await pool.execute(
    "INSERT INTO event_comments (event_id, user_id, comment, rating) VALUES (?, ?, ?, ?)",
    [eventId, userId, comment, rating]
  );
  return result.insertId;
}

export async function findByEvent(eventId) {
  const [rows] = await pool.execute(
    `SELECT c.id, c.comment, c.rating, c.comment_date, u.name
     FROM event_comments c
     JOIN users u ON u.id_users = c.user_id
     WHERE c.event_id = ?
     ORDER BY c.comment_date DESC`,
    [eventId]
  );
  return rows;
}