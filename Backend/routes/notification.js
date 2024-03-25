import express from "express";
import { getAllNotifications,createNotification, sendNotification, updateNotification ,getNotification} from "../controllers/notification.js";
import {verifyAdmin1, verifyStaff1} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin1, createNotification);
router.put("/:id", verifyAdmin1,updateNotification);
router.get("/:id", verifyAdmin1,getNotification);
//GET ALL

router.get("/", getAllNotifications);
router.get("/find/:id", verifyStaff1,sendNotification);






export default router;
