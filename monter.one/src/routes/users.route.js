import { Router } from "express";

const router = Router();

// importing controllers
import handleLogin from "../controllers/loginHandler.js";
import handleRegistration from "../controllers/registrationHandler.js";

// registration handlers
router.route("/register").post(handleRegistration);

//login handlers
router.route("/login").post(handleLogin);

export { router as usersRouter };
