import { Router } from "express";
import addressController from "../../controllers/address.controller.js";
import authGuard from "../../middlewares/authGuard.js";

const router = Router();

router.post("/", addressController.createAddress);
router.get("/", authGuard("ADMIN"), addressController.getAllAddress);
router.patch("/:id", authGuard("ADMIN"), addressController.updateAddress);
router.delete("/:id", authGuard("ADMIN"), addressController.deleteAddress);

export default router;
