import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./utils/db.js";
import { authRouter } from "./Routes/auth.route.js";
import { aiRouter } from "./Routes/ai.route.js";
config(); //To use env variables
const app = express(); //instance of express

//Middlewares
app.use(
  //cross origin resource sharing
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser()); //tp parse the cookies
app.use(express.json()); //to parse json data
connectDb(); //Connect to Database

app.use("/auth", authRouter); //Routes related to user authentication
app.use("/ai", aiRouter); //Routes related to user authentication
app.get("/", (req, res) => {
  res.send("Server Working");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
