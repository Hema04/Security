var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const bodyparser = require( 'body-parser' );

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newRouter = require('./routes/newRoute');

var hpp = require( 'hpp' ) ;


var app = express();
app.use( bodyparser.urlencoded() ) ;
// app.use( hpp() ) ;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/endpoint', newRouter);

app.use(helmet());
app.disable( 'x-powered-by' ) ;
app.use(hpp({ checkQuery: false }));

app.use('/none', function(req, res){
  
  if(req.query.name){
    res.status(200).send('Hi ' + req.query.name.toUpperCase())
    app.use( helmet.hsts( { maxAge: 7776000000 } ) ) ;
    app.use( helmet.frameguard( 'SAMEORIGIN' ) ) ;
    app.use( helmet.xssFilter( { setOnOldIE: true } ) ) ;
    app.use( helmet.noSniff() ) ;
  } else {
    res.status(200).send('Hi');
  }
});


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
