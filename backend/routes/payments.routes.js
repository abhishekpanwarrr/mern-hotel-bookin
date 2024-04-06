import express from "express";
import {
  createOrder,
  verifyPayment,
  getAllPayments
} from "../controller/payments.controller.js";

const router = express.Router();
router.post("/orders", createOrder);
router.get("/:id",getAllPayments)
router.post("/verify", verifyPayment);

export default router;