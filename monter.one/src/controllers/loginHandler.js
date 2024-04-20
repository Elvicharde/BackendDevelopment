import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import dotenv from "dotenv";

// using environment variables to store sensitive credentials
dotenv.config();

export default async function handleLogin(req, res) {
  const { email, password } = req.body;

  // checking if user credentials are valid
  try {
    const user = await User.login(email, password);

    const sessionToken = createToken(user._id);

    res.status(200).json({
      status: "Success",
      message: "Login Successful",
      payload: { userId: user._id, email, sessionToken },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export function createToken(_userId) {
  return jwt.sign({ _id: _userId }, process.env.SECRET, {
    expiresIn: "1d",
  });
}
