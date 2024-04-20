import User from "../models/Users.js";
import otps from "../models/otpModel.js";
import Randomstring from "randomstring";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// using environment variables to store sensitive credentials
dotenv.config();

const SENDER_EMAIL = process.env.SENDER_EMAIL,
  SENDER_PASSWORD = process.env.SENDER_PASSWORD;

export default async function handleRegistration(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);
    await sendOtpVerification(user, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function sendOtpVerification({ _id, email }, res) {
  console.log(SENDER_EMAIL, SENDER_PASSWORD);
  try {
    const newOtp = Randomstring.generate({ length: 5, charset: "numeric" });

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: "587",
      secure: "false",
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
    });

    const emailParams = {
      from: SENDER_EMAIL,
      to: email,
      subject: "Email verification with Monter.one",
      html: `<p>Enter the following OTP to verify your new account with Monter.one: <br/><br/><strong>${newOtp}</strong><br><p><p>This otp expires in 1 hour!</p>`,
    };

    // hashing the password for new user using bcrypt
    const otpSalt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(newOtp, otpSalt);

    await otps.create({
      userId: _id,
      hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    // send email with configured parameters
    await mailTransporter.sendMail(emailParams);

    // return success message
    res.status(201).json({
      status: "PENDING",
      message: `Verification OTP sent to ${email}`,
      payload: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
}
