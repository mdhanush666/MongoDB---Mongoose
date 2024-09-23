const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dbO = require('./newDB');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');

const BookModel = require('./model/newBookModel');

dbO.getDatabase();

app.engine('hbs', exhbs.engine({
  layoutsDir:'./views',
  defaultLayout:'main',
  extname:'hbs',
  runtimeOptions:{
    allowProtoMethodsByDefault:true,
    allowProtoPropertiesByDefault:true
  }
}))

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', async (req,res) =>{
  let book = await BookModel.find({});
  
  let acknowledgement = '';
  let update_id, update_book;
  let delete_book_id;

  if(req.query.update_id){
    update_id = req.query.update_id;
    update_book = await BookModel.findOne({_id:update_id});
  }
  if(req.query.delete_book_id){
    delete_book_id = req.query.delete_book_id;
    await BookModel.deleteOne({_id:delete_book_id});
    return res.redirect('/?status=del');
  }
  
  switch(req.query.status){
    case 'ins':
      acknowledgement = 'Insert';
      break;
    case 'upd':
      acknowledgement = 'Update';
      break;
    case 'del':
      acknowledgement = 'Delete';
      break;
      
      default:
        acknowledgement = '';
  }      
  res.render('main', {book, acknowledgement, update_id, update_book})
})
    
app.post('/add-book', (req,res) =>{
  let book = new BookModel({
    title: req.body.title,
    author: req.body.author
  });
  book.save();
  
  return res.redirect('/?status=ins')
})

app.post('/update-book/:id', async (req,res) =>{
  let getID = req.params.id;
  let book = {
    title:req.body.title, 
    author:req.body.author
  }
  await BookModel.updateOne({_id:getID}, {$set:book})
  return res.redirect('/?status=upd');
})

app.listen(PORT, () =>{
  console.log('Server is Running no ', PORT);
})