import User from "../models/Users.js";

export default async function handleRegistration(req, res) {
  res.json({
    Status: 200,
    Response: "Register!",
  });
}
