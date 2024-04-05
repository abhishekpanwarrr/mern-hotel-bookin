import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
const register = async (req, res) => {
  try {
    const { fullName, email, password, address } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: passwordHash,
      address,
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ status: 201, msg: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 400, msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, msg: "Invalid credentials" });
    }
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    const token = jwt.sign(
      { id: user?._id, email: user?.email, fullName: user?.fullName },
      process.env.JWT_SECRET
    );

    res.status(200).json({ status: 200, token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById({ _id: userId });
    return res
      .status(200)
      .json({ status: 200, msg: "User found successfully", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export { login, register, getUserDetails };
