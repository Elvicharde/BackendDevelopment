import mongoose from "mongoose";
import Randomstring from "randomstring";
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

// generating static methods

otpSchema.statics.generateOtp = async function () {
  return Randomstring.generate({ length: 5, charset: "numeric" });
};

otpSchema.statics.verifyOtp = async function (userId, otp) {
  if (!otp) {
    throw Error("OTP cannot be empty");
  }

  const userOtpRecord = await this.findOne({ userId });

  if (!userOtpRecord) {
    throw Error(
      "User account already verified or doesn't exist, please login or register as appropriate!"
    );
  }
  const { expiresAt, hashedOtp } = userOtpRecord;

  if (expiresAt < Date.now()) {
    await this.deleteMany({ userId });
    throw Error("Otp already expired. Please request for a new one!");
  }

  const validOTP = await bcrypt.compare(otp, hashedOtp);

  if (!validOTP) {
    throw Error("Incorrect otp! Kindly check your inbox and try again...");
  }

  //   otherwise valid otp
  await User.updateOne({ _id: userId }, { verified: true });
  await this.deleteMany({ userId });
  //   return success message
  return true;
};

// creating and exporting the User model
const otps = mongoose.model("otps", otpSchema);
export default otps;
