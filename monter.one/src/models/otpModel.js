import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./Users.js";

mongoose.set("strictQuery", false);

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    hashedOtp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// creating and exporting the User model
const otps = mongoose.model("otps", otpSchema);
export default otps;
