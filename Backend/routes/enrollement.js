import express from "express";
import { createEnrollement, deleteEnrollement, getEnrollement, getEnrollements, getEnrollementsFirstLogin, getEnrollementsSubsequentLogin, updateEnrollement ,removeStudentFromEnrollment} from "../controllers/enrollement.js";
import {verifyAdmin1, verifyStudent1} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin1, createEnrollement);

//UPDATE
router.put("/:id", verifyAdmin1, updateEnrollement);
//DELETE
router.delete("/find/:id", verifyAdmin1, deleteEnrollement);
//GET

router.get("/find/:id",verifyAdmin1, getEnrollement);
//GET ALL

router.get("/",verifyAdmin1, getEnrollements);


// For the first login
router.post("/first-login", verifyStudent1, getEnrollementsFirstLogin);

// For subsequent logins
router.get("/subsequent-login", verifyStudent1, getEnrollementsSubsequentLogin);


//router.delete("/remove", verifyStudent1, removeStudentFromEnrollment);
//methanadi delete dekak thiyenawa ethakota eka delete ekak meke remove kiyana eka id eka vidiyata gannawa
//remove eka thiyena route eka id eka ena route eka kiyala hithala execute krama error penna ne
router.delete("/remove", verifyAdmin1, removeStudentFromEnrollment);

export default router;
