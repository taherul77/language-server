import { Router } from "express";
import seminarController from "../../controllers/seminar.contoller.js";
import authGuard from "../../middlewares/authGuard.js";

const router= Router();
// router.route("/").post(" seminar comming soon");
router.route("/").post(authGuard('admin', 'user'),seminarController.createSeminar);

export default router