import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export default async function handleLogin(req, res) {
  res.json({
    Status: 200,
    Response: "Login!",
  });
}
