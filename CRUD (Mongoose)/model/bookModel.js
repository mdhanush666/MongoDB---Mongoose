const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:String,
  author:String
})

const bookModel = mongoose.model('books', bookSchema)

module.exports = bookModel;