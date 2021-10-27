const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerID: {
    type: String,
    required: true,
  },
  items: [
    { type: mongoose.ObjectId, ref: 'Product' }
  ]
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
