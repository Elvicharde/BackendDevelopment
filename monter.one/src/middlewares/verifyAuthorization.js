import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import dotenv from "dotenv";

// using environment variables to store sensitive credentials
dotenv.config();

const verifyAuthorization = async (req, res, next) => {
  // check for authorization token
  const { authorization: authToken } = req.headers;

  if (!authToken) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  try {
    const { _id } = jwt.verify(authToken, process.env.SECRET);
    req.user = await User.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized request!" });
  }
};

export default verifyAuthorization;
