import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../Models/user.model.js";
config();
export async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ success: false, msg: "No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded || !decoded._id) {
      return res.status(401).json({ success: false, msg: "Invalid Token" });
    }

    const user = await User.findById(decoded._id).select("-password"); // optionally exclude sensitive fields
    if (!user) {
      return res.status(401).json({ success: false, msg: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: error.message });
  }
}
