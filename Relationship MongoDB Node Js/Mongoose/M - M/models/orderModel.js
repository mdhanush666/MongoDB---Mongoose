const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');


const orderSchema = new mongoose.Schema({
  amount:Number,
  customer_id:{
    type:ObjectId,
    ref:'customer'
  },
  product_ids:[{
    type:ObjectId,
    ref:'products'
  }]
});

const orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;
