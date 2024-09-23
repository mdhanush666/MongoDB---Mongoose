const mongoDB     = require('mongodb');
const mongoClient = mongoDB.MongoClient;
const ObjectID    = mongoDB.ObjectId;

let database;

async function getDatabase(){
  const client = await mongoClient.connect('mongodb://127.0.0.1:27017');

  database = client.db('library');
  
  if(!database){
    console.log('Database not Connected!')
  }

  return database;

}

module.exports = {getDatabase, ObjectID}
