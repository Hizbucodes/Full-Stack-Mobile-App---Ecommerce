import { User } from "../model/user.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    user.addresses.push(address);
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User address added successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${err.message}`,
    });
  }
};

export const getAllAddress = async (req, res) => {
  try {
    const userID = req.params.userId;

    const user = await User.findById(userID);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const addresses = user.addresses;

    return res.status(200).json({
      status: "success",
      message: "All addresses recieved",
      addresses,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${err.message}`,
    });
  }
};
