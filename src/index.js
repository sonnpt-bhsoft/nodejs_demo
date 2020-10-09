require('dotenv').config();
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars'); // template engine

// const authController = require('../src/app/controllers/AuthController');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
const { urlencoded } = require('express');





// xử lí req.body ( nhận dữ liệu từ input với phương thức post ) trả về undefined
app.use(express.urlencoded({
  extended: true
}));

// xử lý dữ liệu gửi lên server với javascript
app.use(express.json());




// // Connect to db
db.connect();

app.use(cookieParser());


//static file
app.use(express.static(path.join(__dirname, 'public')));

// template engine 
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
      sum : (a, b) => a + b
  }
}));
app.set('view engine', 'hbs');

// change default folder of handlebars 
app.set('views', path.join(__dirname, 'resources', 'views')); 


// ghi đè method GET/POST trong form 
app.use(methodOverride('_method'));

// Route init
route(app);



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})