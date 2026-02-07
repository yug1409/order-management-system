import Order from "../models/order.js";
import { createOrderSchema } from "../validations/order.validation.js";


// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const data = createOrderSchema.parse(req.body);

    const order = await Order.create(data);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};



//  GET ORDER

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.menuItemId");

    res.json(order);
  } catch (err) {
    next(err);
  }
};
