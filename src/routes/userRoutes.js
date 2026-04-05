import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createUser_controller, getUsers_controller, updateUser_controller } from "../controllers/user.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createUser_controller);

router.get("/", getUsers_controller);

router.patch("/:id", updateUser_controller);

export default router;