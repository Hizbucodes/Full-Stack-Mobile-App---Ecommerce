import { Order } from "../model/order.js";
import { User } from "../model/user.js";

export const storeAllOrders = async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }));

    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    return res.status(201).json({
      status: "success",
      message: "Order created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${err.message}`,
    });
  }
};
