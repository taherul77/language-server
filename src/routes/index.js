import { Router } from "express";
import authRoutes from "../api/auth/index.js";
import userRoutes from "../api/user/index.js";
import seminarRoute from "../api/seminar/index.js";
const router = Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/seminar", seminarRoute);
export default router;
