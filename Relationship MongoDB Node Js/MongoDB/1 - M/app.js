const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;

(async () =>{
  let database;

  database = await mongoClient.connect('mongodb://127.0.0.1:27017').then((client =>{
    database = client.db('shop')

    console.log('Database Connected Successfully')
    return database;
  }))
  .catch((err)=>{
    console.error(`Database Connection Failed, Reason - \n ${err}`)
  })

  let result = await database.collection('orders').aggregate([{
    $lookup:{
      from:"products",
      localField:"product_ids",
      foreignField:"_id",
      as:"Order_Products_details"
    }

  }]).toArray();

  // console.log(JSON.stringify(result))
  console.log(result[0])


})();
