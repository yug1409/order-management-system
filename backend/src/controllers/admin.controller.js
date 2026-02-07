import Order from "../models/order.js";
import { emitEvent } from "../sockets/order.socket.js";



//  GET ALL ORDERS (Admin Panel)

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};



//  UPDATE ORDER STATUS (Manual)

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    emitEvent("orderStatus", {
      orderId: order._id.toString(),
      status: order.status,
    });

    console.log(`Admin updated order ${order._id} → ${order.status}`);

    res.json(order);
  } catch (err) {
    next(err);
  }
};
