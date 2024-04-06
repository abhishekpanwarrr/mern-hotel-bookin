import express from "express";
import {
  addHotel,
  fetchAllHotels,
  fetchSingleHotel,
  addLikedHotel,
  searchHotelsByAddress,
} from "../controller/hotel.controller.js";

const router = express.Router();
router.post("/", addHotel);
router.get("/", fetchAllHotels);
router.get("/hotel/:id", fetchSingleHotel);
router.post("/liked", addLikedHotel);
router.get("/search", searchHotelsByAddress);
export default router;
