import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passwordValidator from "password-validator";
import validator from "email-validator";
import { JWT_SECRET } from "../config/env.js";
import { UserModel } from "../models/user.model.js";

// Create User
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ Message: "All fields are mandatory!" });
    }
    if (!validator.validate(email)) {
      return res
        .status(401)
        .json({ Message: "E-mail must be in the format 'abc@xyc.com'" });
    }
    const oldUser = await UserModel.findOne({ email, username });
    if (oldUser) {
      return res
        .status(400)
        .json({ Message: "You are already registered with us!" });
    }
    const validatePassword = new passwordValidator();
    validatePassword
      .is()
      .min(8, "minimum 8 characters") // Minimum length 8
      .has()
      .uppercase(1, " one uppercase") // Must have uppercase letters
      .has()
      .lowercase(1, "one lowercase") // Must have lowercase letters
      .has()
      .digits(2, "minimum 2 digits"); // Must have at least 2 digits
    const validatedPassword = validatePassword.validate(password, {
      details: true,
    });
    const message = `Password must have ${validatedPassword
      .map((error) => error.message)
      .join(", ")}`;
    if (!validatePassword.validate(password)) {
      return res.status(401).json({ Message: message });
    }
    const hashPassword = await bcrypt.hash(password, 6);
    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ Message: "Registration Successfull!" });
  } catch (error) {
    console.log("Error occured in registration:", error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

// Sign-In
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ Message: "All fields are mandatory!" });
  }
  if (!validator.validate(email)) {
    return res
      .status(401)
      .json({ Message: "E-mail is not in the format 'abc123@xyz.com'" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ Message: "Please register first!" });
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(400).json({ Message: "Please check password!" });
  }
  const payload = { _id: user._id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  res.status(200).json({ Message: "Logged-In successfully!", token, user });
};
