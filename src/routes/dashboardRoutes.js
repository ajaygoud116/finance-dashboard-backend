import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getSummary_controller } from "../controllers/dashboard.controller.js";

const router = express.Router();

// GET /dashboard/summary
router.get("/summary", authMiddleware, getSummary_controller);

export default router;