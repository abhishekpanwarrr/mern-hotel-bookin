import crypto from "crypto";
import Razorpay from "razorpay";
import Payment from "../model/Payment.js";

const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: req.body.orderId,
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      totalAmount,
      orderItems,
      userId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
    const generated_signature = hmac.digest("hex");

    if (generated_signature == razorpaySignature) {
      await Payment.create({
        totalAmount,
        orderItems,
        userId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const getAllPayments = async (req, res) => {
  const id = req.params.id;
  try {
    const allPayments = await Payment.find({ userId: id });
    res
      .status(200)
      .json({ msg: "All payments", status: 200, data: allPayments });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

export { createOrder, verifyPayment, getAllPayments };
