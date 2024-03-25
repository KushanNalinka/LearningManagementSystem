import mongoose from "mongoose";
const TimetableSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
      //unique: true,
    },
    lecturer: {
        type: String,
        required: true,
      },
    time: {
      type: String,
      required: true,
    },
    date: {
        type: Date,
        required: true,
      },
      faculty: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

export default mongoose.model("Timetable", TimetableSchema);
