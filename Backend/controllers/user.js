
import User from "../models/User.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
//Not passing a query directly fetch Staff users
export const getStaffUsers = async (req, res, next) => {
  try {
    const studentRegex = /^(LE|SE|PRO|DR)\d{8}$/; // Regular expression for the username format
    const users = await User.find({ username: { $regex: studentRegex } });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
//asign to a course
export const assignCourse = async (req, res, next) => {
  const userId = req.params.id;
  const { moduleCode } = req.body; // Assuming the module code is passed in the request body

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the module code already exists in user's modules array
    if (user.modules.includes(moduleCode)) {
      return res.status(400).json({ error: "Module code already assigned to the user" });
    }

    // Add the new module code to the user's modules array
    user.modules.push(moduleCode);

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const removeCourse = async (req, res, next) => {
  const userId = req.params.id;
  const { moduleCode } = req.body; // Assuming the module code is passed in the request body

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the module code exists in user's modules array
    const moduleIndex = user.modules.indexOf(moduleCode);
    if (moduleIndex === -1) {
      return res.status(400).json({ error: "Module code not assigned to the user" });
    }

    // Remove the module code from the user's modules array
    user.modules.splice(moduleIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
