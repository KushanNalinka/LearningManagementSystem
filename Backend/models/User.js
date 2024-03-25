import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number, // Role property as a string type
      default: 0,
    },
    modules:{
      type: [String],  // Change the type to an array of strings
      default: [],     // Set default value to an empty array
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);