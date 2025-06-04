import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../Controllers/auth.controller.js";
import { verifyToken } from "../Middleware/auth.middleware.js";
export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/check", verifyToken, checkAuth);
