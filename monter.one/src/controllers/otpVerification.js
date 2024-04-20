import User from "../models/Users.js";
import otps from "../models/otpModel.js";
import bcrypt from "bcrypt";

export default async function verifyOtp(req, res) {
  try {
    const { userId, otp } = req.body;

    if (!otp) {
      throw Error("OTP cannot be empty");
    }

    const userOtpRecord = await otps.findOne({ userId });

    if (!userOtpRecord) {
      throw Error(
        "User account already verified or doesn't exist, please login or register as appropriate!"
      );
    }
    const { expiresAt, hashedOtp } = userOtpRecord;

    if (expiresAt < Date.now()) {
      await otps.deleteMany({ userId });
      throw Error("Otp already expired. Please request for a new one!");
    }

    const validOTP = await bcrypt.compare(otp, hashedOtp);

    if (!validOTP) {
      throw Error("Incorrect otp! Kindly check your inbox and try again...");
    }

    //   otherwise valid otp
    await User.updateOne({ _id: userId }, { verified: true });
    await otps.deleteMany({ userId });
    //   return success message
    res.status(201).json({
      status: "VERIFIED",
      message: `You have successfully verified your account! Please update the following details: location, age and work details`,
      payload: {
        userId,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}
