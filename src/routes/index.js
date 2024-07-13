import { Router } from "express";
import authRoutes from "../api/auth/index.js";
import userRoutes from "../api/user/index.js";
const router = Router();
router.use("/auth", authRoutes );
router.use("/user", userRoutes);
export default router;