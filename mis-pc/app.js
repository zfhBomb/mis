var express = require('express');
var path = require('path');var compress = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
require('node-jsx').install({extension: '.js'})
var ejs = require('ejs');


var routes = require('./routes/index');
var users = require('./routes/look');
var reg = require('./routes/reg');
var login = require('./routes/login');
var getData=require('./routes/getData');
var myLook=require('./routes/myLook');
var write=require('./routes/write');
var change=require('./routes/change');
var statistical=require('./routes/statistical');
var adminSet=require('./routes/userHandler');

var app = express();

// view engine setup
//app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
     secret: '12345',
     name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
     cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
     resave: false,
     saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/get', getData);
app.use('/look', users);
app.use('/reg', reg);
app.use('/login', login);
app.use('/myLook', myLook);
app.use('/write', write);
app.use('/change', change);
app.use('/statistical', statistical);
app.use('/adminSet',adminSet);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
