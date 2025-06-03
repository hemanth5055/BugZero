import express from "express";
import { review } from "../Controllers/ai.controller.js";
import { checkAuth } from "../Middleware/auth.middleware.js";
export const aiRouter = express.Router();
aiRouter.post("/review", checkAuth, review);
