const express       = require('express');
const app           = express();
const path          = require('path');
const exhbs         = require('express-handlebars');
const bodyParser    = require('body-parser');
const PORT          = process.env.PORT || 4000;

const dbO           = require('./db_connection');
const ObjectID      = dbO.ObjectID;


app.engine('hbs', exhbs.engine({
    layoutsDir: path.join(__dirname,'views'),
    defaultLayout: 'main',
    extname : 'hbs'
}))

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}))

// Select ( R )........................................

app.get('/', async (req,res) =>{    
    let acknowlegement = '';
    let update_id, update_book;
    let delete_book_id;

    let database = await dbO.getDatabase();
    const collection = database.collection('books');

    if(req.query.update_id){        
        update_id = req.query.update_id;
        update_book = await collection.findOne({_id: new ObjectID(update_id)});
        console.log(update_book);
    }

    if(req.query.delete_book_id){
        delete_book_id = req.query.delete_book_id;

        await collection.deleteOne({_id: new ObjectID(delete_book_id)});
        return res.redirect('/?status=deleted');
    }

    switch(req.query.status){
        case 'inserted':
            acknowlegement = 'Insert Success';
            break;
        case 'updated':
            acknowlegement = 'Update Success';
            break;
        case 'deleted':
            acknowlegement = 'Delete Success';
            break;

        default:
            acknowlegement = '';
    }
    
    const cursor = collection.find({});
    let book = await cursor.toArray();

    res.render('main', {acknowlegement, book, update_id, update_book});
})

// Inserting ( C )...................................
app.post('/add-book', async (req,res) =>{
    let database = await dbO.getDatabase();
    const collection = database.collection('books');

    let book = {title:req.body.title, author:req.body.author};
    await collection.insertOne(book)

    return res.redirect('/?status=inserted');

})

// Updating ( U )...................................
app.post('/update-book/:id', async (req,res) =>{
    let database = await dbO.getDatabase();
    const collection = database.collection('books');

    let book = {title:req.body.title, author:req.body.author};
    let getID = req.params.id;
    await collection.updateOne({_id: new ObjectID(getID)}, {$set: book});

    return res.redirect('/?status=updated');

})

app.listen(PORT, ()=>{
    console.log(`Server is Running on : ${PORT}`);
})