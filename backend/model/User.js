import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    address: {
      type: String,
      required: true,
      min: 10,
    },
    likedHotel: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Users", UserSchema);
export default User;
