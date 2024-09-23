const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const exhbs       = require('express-handlebars');
const PORT        = process.env.PORT || 3000;
const path        = require('path');

const dbO         = require('./db');
const ObjectID    = dbO.ObjectID;

// hbs gura name la engine na register seiyenum
app.engine('hbs', exhbs.engine({
  layoutsDir:path.join(__dirname,'views'), defaultLayout:'main', 
  extname:'hbs'
}))

app.set('view engine', 'hbs') // view engine nu configuration set panrom
app.set('views', 'views') // hbs engine views gura folder ra use pannika poguthu

app.use(bodyParser.urlencoded({extended:false}));

// Read....................................

app.get('/', async (req,res) =>{

  let database = await dbO.getDatabase();
  const collection = database.collection('books');
  const cursor = collection.find({});

  let book = await cursor.toArray();


  let message = '';
  let update_id, update_book;
  let delete_id;

  if(req.query.update_id){

    update_id = req.query.update_id;
    update_book = await collection.findOne({_id: new ObjectID(update_id)});
  }

  if(req.query.delete_id){
    delete_id = req.query.delete_id;
    await collection.deleteOne({_id: new ObjectID(delete_id)});
    return res.redirect('/?status=3')
  }

  switch (req.query.status) {
    case '1':
      message = 'Insert Success';
      break;
    case '2':
      message = 'Update Success';
      break;
    case '3':
      message = 'Delete Success';
      break;
    case 'empty':
      message = 'Empty Fields are not Allowed!';
      break;
  
    default:
      break;
  }


  res.render('main', {message, book, update_id, update_book})
})

// Insert..................................

app.post('/add-book', async (req,res) =>{
  let database = await dbO.getDatabase();
  const collection = database.collection('books');

  let book = {title: req.body.title, author: req.body.author}

  if(book.title != '' && book.author != ''){
    await collection.insertOne(book);
    return res.redirect('/?status=1')
  }
  else{
    return res.redirect('/?status=empty')
  }
})

// Update...................................

app.post('/update-book/:id', async (req,res) =>{
  let database = await dbO.getDatabase();
  const collection = database.collection('books');
  let book = {title:req.body.title, author:req.body.author};

  let getID = req.params.id;
  await collection.updateOne({_id:new ObjectID(getID)},{$set: book});
  return res.redirect('/?status=2')
})


app.listen(PORT, () =>{
  console.log(`Server Running on ${PORT}`);
})