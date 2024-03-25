import express from "express";
import { createTimetable,updateTimetable,deleteTimetable,getTimetable,getTimetables } from "../controllers/timetable.js";
import {verifyAdmin1} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/:enrollementid", verifyAdmin1, createTimetable);

//UPDATE
router.put("/:id", verifyAdmin1, updateTimetable);
//DELETE
router.delete("/:id/:enrollementid", verifyAdmin1, deleteTimetable);
//GET

router.get("/find/:id", getTimetable);
//GET ALL

router.get("/", getTimetables);

export default router;
