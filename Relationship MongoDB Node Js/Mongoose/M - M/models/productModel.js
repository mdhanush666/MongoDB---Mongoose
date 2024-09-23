const mongoose = require('mongoose');
// const {ObjectId} = require('mongodb');

const productSchema = new mongoose.Schema();

const productModel = mongoose.model('products', productSchema);

module.exports = productModel; 