import { pool } from "../db.js";
export async function create({ name, email, passwordHash }) {
  // TODO: insert name, email and the hash into users, and return the new id
  await pool.execute("insert into users(name,email,password) Values(?,?,?);",[name,email,passwordHash]);
  
}

export async function findByEmail(email) {
  // TODO: select id_users, name, email, password, role from users
  //       where the email matches, and return ONE user (or undefined)
  const [rows] = await pool.execute("select id_users,name,email,password,role from users where email= ?;",[email]);
  return rows[0]
}
export async function findUserById(id) {
  const [rows] = await pool.execute(
    "SELECT id_users, name, email, role FROM users WHERE id_users = ?",
    [id]
  );
  return rows[0];
}