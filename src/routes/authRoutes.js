import express from "express";
import {loginUser } from "../controllers/authUser.controller.js";

const router = express.Router();

router.post("/login", loginUser);

export default router;
