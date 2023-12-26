import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
// middleware
app.use(cors({ credentials: true, origin: process.env.SITE }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/auth", authRoutes);
app.use("/v1/post", postRoutes);

//eslint-disable-next-line
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("database connected");
  app.listen(port, async () => {
    console.log("Server is running on port ", port);
    //eslint-disable-next-line

    // for (let i = 0; i < 8; i++) {
    //   await createRandomUser()
    // }
  });
});
