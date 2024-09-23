const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;

(async () =>{
  let database;

  database = await mongoClient.connect('mongodb://127.0.0.1:27017').then((client =>{
    database = client.db('shop');

    if(database){
      console.log('Databasae Connection Success');
    }
    else{
      console.error('Databasae Connection Failed!');
    }
    return database;
  }))

  let result = await database.collection('customer').aggregate([{$lookup:{
    from:"customer_phone",
    localField:"_id",
    foreignField:"customer_id",
    as : "Customer_Phone"
  }}]).toArray();

  let resultTest = await database.collection('customer').find({}).toArray();

  console.log(resultTest)
  
}) ();