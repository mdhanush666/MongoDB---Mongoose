const mongoDB     = require('mongodb');
const mongoClient = mongoDB.MongoClient;



(async ()=>{

  let database;

  database = await mongoClient.connect('mongodb://127.0.0.1:27017').then((client) =>{
    
    database = client.db('shop');
  
      if(!database){
        console.log('Database Connection Failed!')
      }
      else{
        console.log('Database Connection Success')
      }
      return database;
  });
 
  let data = await database.collection('orders').aggregate([{
    $lookup:{
      from:"products",
      localField:"product_ids",
      foreignField:"_id",
      as:"Order_Products"
    }
  }]).toArray()
  
  let temp = JSON.stringify(data);

  console.log(temp)
  
})();

