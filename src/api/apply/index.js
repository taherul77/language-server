import { Router } from "express";
import applyController from "../../controllers/apply.controller.js";
import authGuard from "../../middlewares/authGuard.js";

const router = Router();

router.post("/", applyController.createApply);

router.get("/", authGuard("ADMIN"), applyController.getAllApplies);

router.patch("/:id", authGuard("ADMIN"), applyController.updateApply);

router.delete("/:id", authGuard("ADMIN"), applyController.deleteApply);

export default router;
