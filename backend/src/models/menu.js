import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
