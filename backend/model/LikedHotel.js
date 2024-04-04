import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    hotelId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotels", HotelSchema);
export default Hotel;
