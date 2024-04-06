import Hotel from "../model/Hotel.js";
import User from "../model/User.js";

const addHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ hotelName: req.body.hotelName });
    if (hotel) {
      return res
        .status(409)
        .json({ status: 409, msg: "This hotel already exists!", hotel });
    } else {
      const newHotel = new Hotel(req.body);
      await newHotel.save();
      res.status(201).json({
        status: 201,
        msg: "Hotel added successfully!",
        hotel: newHotel,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const fetchAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res
      .status(200)
      .json({ status: 200, msg: "Hotels fetched successfully", hotels });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const fetchSingleHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findOne({ _id: id });
    if (!hotel) {
      return res.status(404).json({ status: 404, msg: "Hotel not found" });
    }
    res
      .status(200)
      .json({ status: 200, msg: "Hotels fetched successfully", hotel });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addLikedHotel = async (req, res) => {
  try {
    const { userId, hotelId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    let msg = "";
    if (user.likedHotel.includes(hotelId)) {
      user.likedHotel = user.likedHotel.filter((id) => id !== hotelId);
      msg = "Hotel removed from liked hotels";
    } else {
      // Hotel not liked, add it
      user.likedHotel.push(hotelId);
      msg = "Hotel added to liked hotels";
    }

    await user.save();
    res.status(200).json({
      status: 200,
      msg: `${msg} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const searchHotelsByAddress = async (req, res) => {
  const { address } = req.query;
  try {
    const hotels = await Hotel.find({
      address: { $regex: address, $options: "i" },
    });
    res
      .status(200)
      .json({ status: 200, msg: "Hotels fetched successfully", hotels });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export {
  addHotel,
  fetchAllHotels,
  fetchSingleHotel,
  addLikedHotel,
  searchHotelsByAddress,
};
