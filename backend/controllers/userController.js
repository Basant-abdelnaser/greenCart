import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user : /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: passwordHash,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true, //prevent js to accress cookie
        secure: process.env.NODE_ENV === "production", //use secure cookie in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expires in 7 days
      });
      await newUser.save();
      return res.status(201).json({
        message: "User registered successfully",
        user: { name: newUser.name, email: newUser.email },
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// login user : /api/user/login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true, //prevent js to accress cookie
      secure: process.env.NODE_ENV === "production", //use secure cookie in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expires in 7 days
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// check auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    // const { userId } = req.userId;
    const user = await User.findById(req.userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// logout user : /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
