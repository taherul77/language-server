import { Router } from "express";

import applyController from "../../controllers/apply.controller.js";
import authGuard from "../../middlewares/authGuard.js";
const router =Router();

router.route("/").post( applyController.createApply);
router.get('/apply', authGuard("ADMIN"), applyController.getAllApplies);
export default router