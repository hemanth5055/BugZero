import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export async function checkAuth(req, res, next) {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ success: false, msg: "No token found" });
    }
    const user = jwt.verify(token, process.env.JWT_KEY);
    if (!user) {
      return res.status(401).json({ success: false, msg: "Invalid Token" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: error.message });
  }
}
