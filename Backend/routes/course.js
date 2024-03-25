import express from "express";
import { createCourse,updateCourse,deleteCourse,getCourse,getCourses } from "../controllers/course.js";
import {verifyAdmin1,verifyStaff1} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin1, createCourse);

//UPDATE
router.put("/:id", verifyAdmin1, updateCourse);
//DELETE
router.delete("/:id", verifyAdmin1, deleteCourse);
//GET

router.get("/find/:id",verifyStaff1, getCourse);
//GET ALL
//GET A COURSE
router.get("/", verifyStaff1,getCourses);

export default router;
