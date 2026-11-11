import { pool } from "../db.js";

export async function create({ userId, eventId, motivation }) {
  const [result] = await pool.execute(
    "INSERT INTO event_registration (user_id, event_id, motivation) VALUES (?, ?, ?)",
    [userId, eventId, motivation]
  );
  return result.insertId;
}

export async function findByEvent(eventId) {
  const [rows] = await pool.execute(
    `SELECT r.id, r.registration_date, r.motivation, u.name, u.email
     FROM event_registration r
     JOIN users u ON u.id_users = r.user_id
     WHERE r.event_id = ?
     ORDER BY r.registration_date`,
    [eventId]
  );
  return rows;
}