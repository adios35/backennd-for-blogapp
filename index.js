import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/postRoutes.js";
import { verifyToken } from "./middleware/verifiyToken.js";
// import { faker } from "@faker-js/faker";
const app = express();
// middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/protected", verifyToken, (req, res) => {
  console.log(req?.user)
  res.send("hello world");
});
const hellow world

app.use("/v1/auth", authRoutes);
app.use("/v1/post", postRoutes);



// async function createRandomUser() {
//   const userId = new mongoose.Types.ObjectId("657e7a61b7d315bbea303723")
//   const newPost = new Post({
//     title: faker.lorem.sentence(4),
//     content: faker.lorem.paragraph({ max: 40 }),
//     author: userId
//   })
//   await newPost.save()
// }


//eslint-disable-next-line
const port = process.env.PORT || 3000

app.listen(port, async () => {
  console.log("Server is running on port ",port);
//eslint-disable-next-line
  await mongoose.connect(process.env.MONGO_URI)
  console.log("database connected");
  // for (let i = 0; i < 8; i++) {
  //   await createRandomUser()
  // }
});


