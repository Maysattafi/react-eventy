import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json("token invalid")
  }

  try {
    const decoded = jwt.verify(token,process.env.jwt_secret)
    req.user=decoded;
    next();
  } catch (error) {
    return res.status(401).json("token invalid or expired");
  }
}