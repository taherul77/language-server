import { Router } from "express";
import mailController from "../../controllers/mail.controler.js";
import authGuard from "../../middlewares/authGuard.js";

const router = Router();

router.post("/", mailController.createMail)
router.get("/", authGuard("ADMIN"), mailController.getAllMail);
router.patch("/:id", authGuard("ADMIN"), mailController.updateMail );
router.delete("/:id", authGuard("ADMIN"), mailController.deleteMail)

export default router