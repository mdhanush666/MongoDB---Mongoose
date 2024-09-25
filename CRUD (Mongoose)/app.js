const express       = require('express');
const app           = express();
const path          = require('path');
const exhbs         = require('express-handlebars');
const bodyParser    = require('body-parser');
const PORT          = process.env.PORT || 4000;

const dbO           = require('./newDB');
const BookModel     = require('./model/bookModel');

dbO.getDatabase(); // Connect Database.............

app.engine('hbs', exhbs.engine({
    layoutsDir: path.join(__dirname,'views'),
    defaultLayout: 'main',
    extname : 'hbs',
    runtimeOptions:{
        allowProtoMethodsByDefault:true,
        allowProtoPropertiesByDefault:true
    }
}))

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}))

// Select ( R )........................................

app.get('/', async (req,res) =>{    
    let acknowledgement = '';
    let update_id, update_book;
    let delete_book_id;
    
    if(req.query.update_id){        
        update_id = req.query.update_id;
        update_book = await BookModel.findOne({_id: update_id});
    }
    
    if(req.query.delete_book_id){
        delete_book_id = req.query.delete_book_id;        
        await BookModel.deleteOne({_id: delete_book_id});
        return res.redirect('/?status=deleted');
    }    
    
    let book = await BookModel.find({});

    switch(req.query.status){
        case 'inserted':
            acknowledgement = 'Insert Success';
            break;
        case 'updated':
            acknowledgement = 'Update Success';
            break;
        case 'deleted':
            acknowledgement = 'Delete Success';
            break;

        default:
            acknowledgement = '';
    }

    res.render('main', {acknowledgement, book, update_id, update_book});
})

// Inserting ( C )...................................
app.post('/add-book', (req,res) =>{

    let book = new BookModel({
        title: req.body.title, 
        author: req.body.author
    });
    book.save();

    return res.redirect('/?status=inserted');

})

// Updating ( U )...................................
app.post('/update-book/:id', async (req,res) =>{

    let book = {
        title:req.body.title, 
        author:req.body.author
    };

    let getID = req.params.id;
    await BookModel.findOneAndUpdate({_id: getID}, {$set: book});

    return res.redirect('/?status=updated');
})



app.listen(PORT, ()=>{
    console.log(`Server is Running on : ${PORT}`);
})