import { Router } from "express";

import applyController from "../../controllers/apply.controller.js";


const router =Router();

router.route("/").post( applyController.createApply);
export default router