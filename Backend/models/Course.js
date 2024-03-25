import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true, 
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
      credits: {
        type: Number,
        required: true,
      },
  
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
