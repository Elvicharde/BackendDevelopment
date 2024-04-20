import { Router } from "express";

const router = Router();

// importing controllers
import handleLogin from "../controllers/loginHandler.js";
import handleRegistration from "../controllers/registrationHandler.js";

// registration handlers
router.route("/register").get(handleRegistration);

//login handlers
router.route("/login").get(handleLogin);

export { router as usersRouter };
