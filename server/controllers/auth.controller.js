import bcrypt from "bcryptjs";
import { findByEmail, create } from "../repositories/users.repository.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // TODO 1: validation. If name, email or password is missing or empty,
    //         or the password is shorter than 8 characters,
    //         answer 400 with a message and stop.
    
    if(!name || !email || !password || password.length<8){
      return res.status(400).json({ message: "something is wrong" });
    
    }
    const cleanemail=email.trim().toLowerCase()
    const check= await findByEmail(cleanemail)
    if (check){
      return res.status(409).json({ message: "email exist" });

    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await create({ user, name, cleanEmail, role: "user" })
    res.status(201).json(user ,' message: "user crated ');
    // TODO 3: hash the password (cost 10), create the user,
    //         and answer 201 with { id, name, email, role: "user" }.
    //         Never include the password or the hash.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}