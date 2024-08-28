import { Router } from "express";
import seminarController from "../../controllers/seminar.contoller.js";
import authGuard from "../../middlewares/authGuard.js";
 import multer from "multer";
const router= Router();

const upload = multer({dest : "uploads/"})
// router.route("/").post(" seminar comming soon");
router.route("/").post( authGuard(), upload.single("image"),seminarController.createSeminar);

export default router