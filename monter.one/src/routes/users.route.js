import { Router } from "express";
import verifyAuthorization from "../middlewares/verifyAuthorization.js";

const router = Router();
router.use(verifyAuthorization);

// importing controllers
import { updateUser, fetchUserData } from "../controllers/usersController.js";

//Update user details after verification and fetch user data handlers
router
  .route("/:userId")
  .get(verifyAuthorization, fetchUserData)
  .patch(updateUser);

export { router as usersRouter };
