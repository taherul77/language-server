import { Router } from "express";
import userController from "../../controllers/user.controller.js";
import authGuard from "../../middlewares/authGuard.js";

const router = Router();

router.route("/me").get(authGuard(), userController.getMe);

export default router;