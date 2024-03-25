import Notification  from "../models/Notification.js";
import nodemailer from "nodemailer";
import User  from "../models/User.js";


export const createNotification = async (req, res, next) => {
    const newNotification  = new Notification (req.body);
  
    try {
      const savedNotification  = await newNotification .save();
      // Fetch all users' email addresses
    // const users = await User.find({}, 'email');
     //const userEmails = users.map(user => user.email);

    // Send email notification to all users
  //  await sendEmailNotification(userEmails, savedNotification);

    // Respond with the created notification
      res.status(200).json(savedNotification );
    } catch (err) {
      next(err);
    }
  };
  export const getNotification = async (req, res, next) => {
    try {
      const notification = await Notification.findById(req.params.id);
      res.status(200).json(notification);
    } catch (err) {
      next(err);
    }
  };
  export const getAllNotifications = async (req, res, next) => {
    try {
      const notification = await Notification.find();
      res.status(200).json(notification);
    } catch (err) {
      next(err);
    }
  };
  export const updateNotification = async (req, res, next) => {
    try {
      const updatedNotifications = await Notification.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedNotifications);
    } catch (err) {
      next(err);
    }
  };
  //SEND Notification to then Students
  export const sendNotification = async (req, res, next) => {
    try {
      const notification = await Notification.findById(req.params.id);
        // Fetch all users' email addresses
     const users = await User.find({ username: { $regex: /^(BM|IT|HR|EN|BT|AT|PS|ET)\d{8}$/ } }, 'email');
     const userEmails = users.map(user => user.email);

    // Send email notification to all users
    await sendEmailNotification(userEmails, notification);
      res.status(200).json(notification);
    } catch (err) {
      next(err);
    }
  };
  const sendEmailNotification = async (userEmails, notification) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kushannalinka571@gmail.com',
          pass: 'wmyy rrff wame mvmw'
        }
      });
  
      const mailOptions = {
        from: 'kushannalinka571@gmail.com',
        to: userEmails.join(','), // Join all email addresses with comma
        subject: 'New Notification',
        text: `New notification: ${notification.message}`
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };
  //notification controller