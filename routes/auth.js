import express from "express";
import {
  createUser,
  generateToken,
  loginUser,
  userLogOut,
} from "../controller/auth.js";
import { verifyToken } from "../middleware/verifiyToken.js";
import { getUsers } from "../controller/user.js";
const app = express.Router();

// app.get("/logout", userLogOut);
app.get("/token", generateToken);
app.post("/register", createUser);
app.post("/login", loginUser);
app.post("/logout", verifyToken, userLogOut);
app.get("/user", verifyToken, getUsers);

export default app;

