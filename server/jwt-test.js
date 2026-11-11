import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const token = jwt.sign({ id: 1, role: "user" }, secret, { expiresIn: "1h" });
console.log("token:", token);

console.log("decoded without the secret:");
console.log(Buffer.from(token.split(".")[1], "base64url").toString());

const decoded = jwt.verify(token, secret);
console.log("verified with the right secret:", decoded);

try {
  jwt.verify(token, "wrong-secret");
} catch (error) {
  console.log("verified with a wrong secret:", error.message);
}