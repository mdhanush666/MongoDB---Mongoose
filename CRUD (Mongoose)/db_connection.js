const mongoose  = require('mongoose');

function getDatabase(){
    // mongoose.connect('mongodb://127.0.0.1:27017/library2')
    mongoose.connect('mongodb+srv://dhanush:'+ encodeURIComponent('Dhanush!1896$') +'@cluster0.6l2ir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() =>{
        console.log('Database Connect Success');
    })
    .catch(() =>{
        console.error('Database Connect Failed!');
    })
}

module.exports = {getDatabase};