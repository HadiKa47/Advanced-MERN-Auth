import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All felids are required" });
    }

    // Username validation checks
    if (name.length > 20) {
      return res
        .status(400)
        .json({ message: "Username cannot exceed 20 characters" });
    }

    const nameRegex = /^[a-zA-Z0-9]+$/;
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ message: "Username can only contain alphanumeric characters" });
    }

    // Password validation checks
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 8 characters" });
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 1 uppercase and 1 lowercase letter",
      });
    }

    if (!/\d/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must include at least 1 number" });
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return res.status(400).json({
        message: "Password must include at least 1 special character",
      });
    }

    if (password === name) {
      return res
        .status(400)
        .json({ message: "Password cannot be the same as username" });
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // JWT
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("login routes");
};

export const logout = async (req, res) => {
  res.send("login routes");
};
