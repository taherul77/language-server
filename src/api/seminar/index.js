import { Router } from "express";

import authGuard from "../../middlewares/authGuard.js";
import multer from "multer";
import seminarController from "../../controllers/seminar.contoller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  authGuard("ADMIN"),
  upload.single("image"),
  seminarController.createSeminar
);
router.get("/",  seminarController.getAllSeminars);
router.get("/:id", seminarController.getSingleSeminar);
router.patch("/:id", authGuard("ADMIN"), upload.single("image"), seminarController.updateSeminar);
router.delete("/:id", authGuard("ADMIN"), seminarController.deleteSeminar);
export default router;
