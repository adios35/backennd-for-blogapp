// import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import hashPassword from "../ustils/bcryptHashing.js";
import jwt from "jsonwebtoken";
import { User } from "../models/schema.js";

// const client = new PrismaClient();

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const isUserExist = await User.findOne({
    email,
  });
  if (!isUserExist)
    return res.status(404).json({ message: "email tidak terdaftar" });
  try {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "password tidak sesuai" });
    const accessToken = jwt.sign(
      { user: isUserExist.email, id: isUserExist.id },
      //eslint-disable-next-line
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      },
    );
    const refreshToken = jwt.sign(
      {
        email: isUserExist.email,
        id: isUserExist.id,
      },

      //eslint-disable-next-line
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" },
    );
    isUserExist.refreshToken = refreshToken;
    await isUserExist.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "login success", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

export async function createUser(req, res) {
  if (!req.body)
    return res.status(400).json({
      error: "Invalid input",
      message: "Please fill out all required fields in the form.",
    });

  const { email, password } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist)
    return res.status(409).json({ message: "email is already  exist" });

  try {
    const hashedPaswword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPaswword,
    });
    const user = await newUser.save();
    return res.status(200).json({ message: "account is created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

export async function userLogOut(req, res) {
  const id = req.user.id;
  try {
    const user = await User.findOne({
      id,
    });
    if (!user) res.sendStatus(204);
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "logged out" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function generateToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const user = await User.findOne({
      refreshToken,
    });
    if (!user) return res.sendStatus(403);
    //eslint-disable-next-line
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(401);
      const accessToken = jwt.sign(
        { email: decoded.email, id: decoded.id },
        //eslint-disable-next-line
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1d",
        },
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
