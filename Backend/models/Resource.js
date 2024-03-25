import mongoose from "mongoose";
const ResourceSchema = new mongoose.Schema(
  {
    resourcename: {
      type: String,
      required: true,
      //unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    decs: {
      type: String,
      required: true,
    },
    resourceNumbers: [{number:String, unuvailableDates:{type:[Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("Resource", ResourceSchema);
/*
resourceNumbers: [{number:Number, unuvailableDates:[{type:Date}]}],
[
    {number:101,unuvailableDates:[2022.01.19,2010.01.31]}
     {number:102,unuvailableDates:[2022.01.19,2010.01.31]}
      {number:103,unuvailableDates:[2022.01.19,2010.01.31]}
]
*/