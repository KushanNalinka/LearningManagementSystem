import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username:req.body.username,
      email:req.body.email,
      password:hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
/*export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));
    
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};*/
/*export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));
    //we should not send our password
    const { password, isAdmin, ...otherDetails } = user;
    res.status(200).json({...otherDetails});
  } catch (err) {
    next(err);
  }
};*/
//after this our user object is in user_doc
/*
"_doc": {
		"_id": "65fae6836bf3f1ad60d59e93",
		"username": "jhon1",
		"email": "jhon1@gmail.com",
		"password": "$2a$10$t4zApLvkN1rBgxOn3ZCJFubBD7dCLw6NFwPW5ZZJ7gPJGDT9OWOjq",
		"isAdmin": false,
		"createdAt": "2024-03-20T13:37:07.647Z",
		"updatedAt": "2024-03-20T13:37:07.647Z",
		"__v": 0
	}
  */
  /*export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));
      //we should not send our password
      const { password, isAdmin, ...otherDetails } = user._doc;
      res.status(200).json({...otherDetails});
    } catch (err) {
      next(err);
    }
  };*/
  //we did not still add jason wen token
  export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

      const token = jwt.sign(
        { id: user._id, 
          username: user.username,
          isAdmin: user.isAdmin },
        process.env.JWT
      );
      //basically we are going to hash this information
      //for each request we are going to send jwt to verify our identity
      //we are also need a secret key
      //Now What I am going to do is
      //Setting this JWT Token into a Coockie
      //before status we send coockie



      //we should not send our password
      const { password, isAdmin, ...otherDetails } = user._doc;
      res.cookie("access_token",token,{
        httpOnly:true,
      }).status(200).json({...otherDetails});
    } catch (err) {
      next(err);
    }
  };
  //basically we are going to hide our user information in the jason web token and we are are going to send ita as a cookie
  //when ever we make update hote api request we are going to first check this jason web token ,it is going to decide 
  // whether the user is admin or not
  //if it is not admin we are going to send an error
  // if it is admin we are able to update the hotel


  //Write now we are able to use this token
  //we delete hotel we send this cookie and it is going to verify the token first
  //after veriying iit is going to check our user information
  //if it is admin we are allowed to delete the hotel
  