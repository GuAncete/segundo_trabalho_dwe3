require('dotenv').config(); 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rtCliente = require('./routes/rtCliente');
var rtMoto = require('./routes/rtMoto'); 
var rtTratamento = require('./routes/rtTratamento');
var rtMotoTratamento = require('./routes/rtMotoTratamento');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET_API, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cliente', rtCliente); 
app.use('/moto', rtMoto);
app.use('/tratamento', rtTratamento);
app.use('/moto_tratamento', rtMotoTratamento);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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