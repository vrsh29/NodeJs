import { signedCookie } from '../../.cache/typescript/2.6/node_modules/@types/cookie-parser';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://127.0.0.1:27071/confusionsever';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correcly to server');
}, (err) => {console.log(err);});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//supply secret key
app.use(cookieParser('2345-67890-09876-54321'));


function auth(req, res, next) {
  console.log(req.signedCookies);

  if(!req.signedCookies.user) {
  var authHeader = req.headers.authorization;

  if(!authHeader){
    var err = new Error("You are not authenticated");
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  var auth = new Buffer(authHeader.split('')[1], 'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];

  if (user == 'admin' && pass === 'password') {
    res.cookie('user','admin', {signed: true});
    next(); //authorized
  } else {
    var err = new Error("You are not authenticated");
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
 }
 else {
   if(req.signedCookies.user === 'admin') {
     next();
   }
   else {
    var err = new Error("You are not authenticated");
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
   }
 }
}
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
