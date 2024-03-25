import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import courseRoute from "./routes/course.js";
import resourceRoute from "./routes/resources.js";
import timetableRoute from "./routes/timetable.js";
import notificationRoute from "./routes/notification.js";
import enrollementRoute from "./routes/enrollement.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
  app.use(cookieParser());
  app.use(express.json());
  

 app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/resources", resourceRoute);
app.use("/api/notification", notificationRoute)
app.use("/api/course", courseRoute);
app.use("/api/timetable", timetableRoute);
app.use("/api/enrollement", enrollementRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

  app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
  });