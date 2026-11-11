import { pool } from "../db.js";

export async function findAll() {
  // TODO 1: run the list query (the same SQL as your list route) and return the rows
    const [rows] = await pool.execute("SELECT id_event,titre,description,date_event,n_sale,image,category from events order by(date_event) desc;")
    return rows
  }

export async function findById(id) {

  const [rows] = await pool.execute("select id_event,titre,description,date_event,n_sale,image,category from events where id_event= ?;",[id]);
  return rows[0]
}
export async function remove(id) {
  const [result] = await pool.execute(
    "DELETE FROM events WHERE id_event = ?",
    [id]
  );
  return result.affectedRows > 0;
}
export async function add({ titre, description, date_event, n_sale, category }) {
  const [result] = await pool.execute(
    "INSERT INTO events (titre, description, date_event, n_sale, image, category) VALUES (?, ?, ?, ?, '', ?)",
    [titre, description, date_event, n_sale, category]
  );
  return result.insertId;
}