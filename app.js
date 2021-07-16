
// Packages Load
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHsb = require('express-handlebars');
var mongoose = require('mongoose');
const Handlebars = require('handlebars')


var indexRouter = require('./routes/index');

// Create Express App object
var app = express();

// view engine setup
app.engine('.hbs', 
    expressHsb({defaultLayout: 'layout', extname: '.hbs'}), 
);


const MONGO_DB_USER  = 'johntorresmaster'
const MONGO_DB_PASSWORD = ''

var MONGO_URL = "mongodb+srv://clustermartinas.cbu5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL, {
  auth: {
    user: MONGO_DB_USER,
    password: MONGO_DB_PASSWORD
  },
   useNewUrlParser: true , 
   useUnifiedTopology : true
});



app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// to allow images to load from public folder images
app.use(express.static(__dirname + '/public'))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




app.listen(8080, () => {console.log("server is starting at port ", 8080) });

module.exports = app;
