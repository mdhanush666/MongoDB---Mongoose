const mongoose = require('mongoose');

function getDatabase(){
  mongoose.connect('mongodb://127.0.0.1:27017/library2')
  .then(() =>{
    console.log('Database Connected Successfully');
  })
  .catch(() =>{
    console.error('Database Connection Failed!');
  })
}

module.exports = {
  getDatabase
}