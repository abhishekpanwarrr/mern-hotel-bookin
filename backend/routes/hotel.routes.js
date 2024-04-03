import express from "express";
import {
  addHotel,
  fetchAllHotels,
  fetchSingleHotel,
} from "../controller/hotel.controller.js";

const router = express.Router();
router.post("/", addHotel);
router.get("/", fetchAllHotels);
router.get("/hotel/:id", fetchSingleHotel);
export default router;
