import asynchandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    res.status(400);
    throw new Error("user exist");
  }

  const salt = await bcrypt.genSalt(10);
  let ecryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: ecryptedPassword,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("invalid Credentials");
  }
});

const logoutUser = asynchandler(async (req, res) => {
  res.cookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out" });
});

const getMe = async (req, res) => {
  try {
    res.status(200).json({ message: "Get user success" });
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, loginUser, getMe, logoutUser };
