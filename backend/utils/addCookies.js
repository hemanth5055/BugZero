import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const setTokenAsCookie = (user, res) => {
  const token = jwt.sign(user, process.env.JWT_KEY);
  if (!token) {
    return res.status(500), json({ success: false, msg: "JWT Error" });
  }

  //res.cookie(name,value,options)
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
