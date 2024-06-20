// order-item.js or wherever you define your models
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } // Assuming 'Product' is another model
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = { OrderItem };
