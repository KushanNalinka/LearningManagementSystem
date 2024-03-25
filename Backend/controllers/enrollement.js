import Enrollement from "../models/Enrollement.js";
import createError from 'http-errors';
import jwt from "jsonwebtoken";
export const createEnrollement = async (req, res, next) => {
    const newEnrollement = new Enrollement(req.body);
  
    try {
      const savedEnrollement = await newEnrollement.save();
      res.status(200).json(savedEnrollement);
    } catch (err) {
      next(err);
    }
  };
  export const updateEnrollement = async (req, res, next) => {
    try {
      const updatedEnrollement = await Enrollement.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedEnrollement);
    } catch (err) {
      next(err);
    }
  };
  export const deleteEnrollement = async (req, res, next) => {
    try {
      await Enrollement.findByIdAndDelete(req.params.id);
      res.status(200).json("Module Enrollement has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getEnrollement = async (req, res, next) => {
    try {
      const enrollement = await Enrollement.findById(req.params.id);
      res.status(200).json(enrollement);
    } catch (err) {
      next(err);
    }
  };
  export const getEnrollements = async (req, res, next) => {
      try {
          const enrollement = await Enrollement.find()
          res.status(200).json(enrollement);
        } catch (err) {
            res.status(500).json(err);
        }
  };

  // Controller function for first login
export const getEnrollementsFirstLogin = async (req, res, next) => {
    const token = req.cookies.access_token;
  
    try {
      if (!token) {
        return next(createError(401, "Unauthorized: Token not provided"));
      }
  
      const decoded = jwt.verify(token, process.env.JWT);
      const { username } = decoded;
  
      // This is the first time login, so a module code should be provided
      const { moduleCode } = req.body;
  
      if (!moduleCode) {
        return next(createError(400, "Module code is required for the first login"));
      }
  
      // Add the username to the students array in the Enrollement model
      await Enrollement.findOneAndUpdate({ code: moduleCode }, { $addToSet: { students: username } }, { upsert: true });
  
      // Return response indicating successful login
      return res.status(200).json({ message: "First login successful" });
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
  
  // Controller function for subsequent logins
  export const getEnrollementsSubsequentLogin = async (req, res, next) => {
    const token = req.cookies.access_token;
  
    try {
      if (!token) {
        return next(createError(401, "Unauthorized: Token not provided"));
      }
  
      const decoded = jwt.verify(token, process.env.JWT);
      const { username } = decoded;
  
      // Check if the user is already logged in by checking if their username is in the students array
      //const enrollement = await Enrollement.findOne({ students: username });
      // Check if the user is already logged in for a specific course by checking if their username is in the students array
     const enrollement = await Enrollement.findOne({ code: "IT2020", students: username });

  
      if (!enrollement) {
        return next(createError(401, "Unauthorized: User is not enrolled"));
        //kalin enroll wela naththm enroll wenna kiyanna
      }
  
      // User is already logged in, display "You are logged in" message
      return res.status(200).json({ message: "You are logged in" });
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
  export const removeStudentFromEnrollment = async (req, res, next) => {
    const { username, moduleCode } = req.body; // Assuming both username and module code are passed in the request body
  
    try {
      // Find the enrollment by module code
     // const enrollment = await Enrollment.findOne({ code: moduleCode });
      const enrollement = await Enrollement.findOne({code: moduleCode});
      
      if (!enrollement) {
        return res.status(404).json({ error: "Enrollment not found" });
      }
  
      // Check if the username exists in enrollment's students array
      const studentIndex = enrollement.students.indexOf(username);
      if (studentIndex === -1) {
        return res.status(400).json({ error: "Username not enrolled in this module" });
      }
  
      // Remove the username from the enrollment's students array
      enrollement.students.splice(studentIndex, 1);
  
      // Save the updated enrollment document
      await enrollement.save();
  
      res.status(200).json(enrollement);
    } catch (err) {
      next(err);
    }
  };
  
  
  