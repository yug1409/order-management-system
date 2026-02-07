import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
  quantity: Number,
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    customerName: String,
    address: String,
    phone: String,
    totalprice: Number,
    status: {
      type: String,
      enum: [
        "Order Received",
        "Preparing",
        "Out for Delivery",
        "Delivered",
      ],
      default: "Order Received",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
