const mongoose = require('mongoose');

const OrderModel = require('./models/orderModel');
require('./models/productModel');

(async ()=>{

    mongoose.connect('mongodb://127.0.0.1:27017/shop')
    .then(()=>{
        console.log('Database Connected Successfully')
    })
    .catch(()=>{
        console.log('Database Connection failed!')
    })

    let result = await OrderModel.find({}).populate('product_ids');

    result.forEach(ele =>{console.log(ele)})

})();