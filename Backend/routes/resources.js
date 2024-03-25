import express from "express";
import {  createResource, deleteResource, getResource, updateResource,getResources,updateResourceAvailability } from "../controllers/resource.js";
import {verifyAdmin1,verifyStaff1} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin1, createResource);

//UPDATE
router.put("/:id", verifyAdmin1, updateResource);
//DELETE
router.delete("/:id", verifyAdmin1, deleteResource);
//GET

router.get("/find/:id",verifyStaff1, getResource);
//GET ALL

router.get("/",verifyStaff1, getResources);
//GET SINGLE RESOURCE
router.put("/availability/:id/:resourceid",verifyStaff1,updateResourceAvailability);






export default router;
