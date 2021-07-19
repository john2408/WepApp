
// load env variables
require('dotenv').config();

// Packages Load
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHsb = require('express-handlebars');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const connectDB = require('./config/db');



const indexRouter = require('./routes/index');

// Create Express App object
const app = express();

// view engine setup
app.engine('.hbs', 
    expressHsb({defaultLayout: 'layout', extname: '.hbs'}), 
);

connectDB();

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


let listener = app.listen(8080, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

console.log("server is starting at port " + app.get('port'))

module.exports = app;
