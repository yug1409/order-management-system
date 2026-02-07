import Menu from "../models/menu.js";

export const getMenu = async (req, res, next) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    next(err);
  }
};
