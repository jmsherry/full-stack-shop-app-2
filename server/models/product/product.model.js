const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["starter", "main", "dessert", "beverage"],
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
