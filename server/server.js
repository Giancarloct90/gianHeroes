//INIZIALITATIONS
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const exphbs = require('express-handlebars');
const path = require('path');



//VIEWS
//console.log(path.join(__dirname), '/views');
//console.log(path.join(app.get('views'), 'layouts'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

// MIDDLEWARE
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// MIDDLEWARE
app.use(morgan('dev'));

// MULTER CONFIGURATION 
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, fnCallback) => {
        fnCallback(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({
    storage
}).single('image'));


// STATIC CONTENTS
app.use(express.static(path.join(__dirname, '../public/')));
// console.log(path.join(__dirname, '../public/') + 'uploads/1570552326088.png');

// ROUTES
app.use(require('./routes/indexRoutes'));

// DATABASE
mongoose.connect('mongodb+srv://root:GoNe097y4jnFeNF2@cluster0-8pm3c.mongodb.net/raul', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("DATABASE ONLINE");
    }
});

process.env.PORT = process.env.PORT || 3000;
// root
// GoNe097y4jnFeNF2
//     'mongodb+srv://root:GoNe097y4jnFeNF2@cluster0-8pm3c.mongodb.net/raul'
// 'mongodb://localhost:27017/raul'

//SERVER ON
app.listen(process.env.PORT, () => console.log("Online BABY "));