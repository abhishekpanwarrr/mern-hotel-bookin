import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    hotelName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    imageUrl: { type: String, required: true },
    extraImages: {
      type: Array,
      default: [],
      required: true,
    },
    policies: {
      type: Array,
      default: [],
      required: true,
    },
    timing: {
      type: Array,
      default: [],
      required: true,
    },
    ameneties: {
      type: Array,
      default: [],
      required: true,
    },
    roomType: {
      type: Array,
      default: [],
      required: true,
    },
    ratings: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotels", HotelSchema);
export default Hotel;
