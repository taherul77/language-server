import { Router } from "express";
import authController from "../../controllers/auth.controller.js"
const router = Router();

router.route("/register").post(authController.createUser);
router.route("/login").post(authController.loginUser);

export default router;