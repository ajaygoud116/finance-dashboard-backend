import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {createRecord_collector,getRecords_collector,updateRecord_collector,deleteRecord_collector,}
 from "../controllers/record.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createRecord_collector);
router.get("/", getRecords_collector);
router.patch("/:id", updateRecord_collector);
router.delete("/:id", deleteRecord_collector);

export default router;