import { User } from "../model/user.js";
import { Order } from "../model/order.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${err.message}`,
    });
  }
};

export const getUserOrderedProducts = async (req, res) => {
  try {
    const { userId } = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No Orders placed by this user",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Orders found successfully",
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${err.message}`,
    });
  }
};
