import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const verifyAuthorization = async (req, res, next) => {
  // check for authorization token
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  const authToken = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(authToken, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized request!" });
  }
};

export default verifyAuthorization;
