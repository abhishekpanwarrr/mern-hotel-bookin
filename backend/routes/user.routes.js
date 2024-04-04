import express from "express";
import { login, register,getUserDetails } from "../controller/user.conroller.js";

const router = express.Router();
router.post("/login", login);
router.get("/:userId", getUserDetails);
router.post("/register", register);

export default router;
