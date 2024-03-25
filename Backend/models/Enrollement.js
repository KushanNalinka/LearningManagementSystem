import mongoose from "mongoose";
const EnrollemetSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    students:{
      type: [String],  // Change the type to an array of strings
      default: [],     // Set default value to an empty array
    },
    timetable:{
      type:[String],
      default:[],
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Enrollemet", EnrollemetSchema);
