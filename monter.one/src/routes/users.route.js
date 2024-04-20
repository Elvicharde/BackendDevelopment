import { Router } from "express";

const router = Router();

// importing controllers
import { updateUser, fetchUserData } from "../controllers/usersController.js";

//Update user details after verification and fetch user data handlers
router.route("/:userId").get(fetchUserData).patch(updateUser);

export { router as usersRouter };
