import bcrypt from "bcryptjs";
import { findByEmail, create , findUserById} from "../repositories/users.repository.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body ?? {};

    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        message: "Name, email and a password of at least 8 characters are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await findByEmail(cleanEmail);
    if (existingUser) {
      return res.status(409).json({ message: "This email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = await create({ name, email: cleanEmail, passwordHash });

    res.status(201).json({ id, name, email: cleanEmail, role: "user" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "This email is already registered." });
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await findByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id_users, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      id: user.id_users,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
export async function me(req, res) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    res.json({
      id: user.id_users,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

export function logout(req, res) {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.sendStatus(204);
}