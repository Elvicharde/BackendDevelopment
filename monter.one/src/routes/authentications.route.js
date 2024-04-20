import { Router } from "express";

const router = Router();

// importing controllers
import handleLogin from "../controllers/loginHandler.js";
import handleRegistration from "../controllers/registrationHandler.js";
import verifyOtp from "../controllers/otpVerification.js";

// registration handlers
router.route("/register").post(handleRegistration);

//login handlers
router.route("/login").post(handleLogin);

// otp verification
router.route("/verifyOtp").post(verifyOtp);

export { router as authenticationsRouter };
