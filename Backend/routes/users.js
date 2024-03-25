import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  assignCourse,
  removeCourse,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser,verifyStudent,verifyStaff ,verifyPersonAdmin,verifyStaffAdmin,verifyAdminRole,verifyAdmin1,verifyStaff1,verifyStudent1} from "../utils/verifyToken.js";

const router = express.Router();
// Routes for authentication

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
   res.send("hello user, you are logged in")
 })
 //but whatabout if it try to delte or update our user

 router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
   res.send("hello user, you are logged in and you can delete your account")
 })

 router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
  res.send("hello admin, you are logged in and you can delete all accounts")
})
//admin has given a user name type
router.get("/checkadmin1/:id", verifyAdmin1, (req,res,next)=>{
  res.send("hello admin, you are logged in and you can delete all accounts")
})
router.get("/checkstudent1/:id", verifyStudent1, (req,res,next)=>{
  res.send("hello Student, you are logged in and you can delete all accounts")
})
router.get("/checkstaff1/:id", verifyStaff1, (req,res,next)=>{
  res.send("hello Staff, you are logged in and you can delete all accounts")
})
router.get("/checkstudent/:id", verifyStudent, (req,res,next)=>{
  res.send("hello Student, you are logged in and you can delete all accounts")
})
router.get("/checkstaff/:id", verifyStaff, (req,res,next)=>{
  res.send("hello Staff, you are logged in and you can delete all accounts")
})
router.get("/checkrolepanda/:id", verifyPersonAdmin, (req,res,next)=>{
  res.send("hello Admin and Syudent, you are logged in and you can delete all accounts")
})
router.get("/checkrolesanda/:id", verifyStaffAdmin, (req,res,next)=>{
  res.send("hello Admin and Staff, you are logged in and you can delete all accounts")
})
router.get("/checkadminrole/:id", verifyAdminRole, (req,res,next)=>{
  res.send("hello Admin only, you are logged in and you can delete all accounts")
})

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin1, getUsers);

//ASSIGN COURSES
router.post("/assign/:id", verifyAdmin1, assignCourse);
router.delete("/remove/:id", verifyAdmin1, removeCourse);

export default router;
