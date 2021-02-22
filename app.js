var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
// var cors         = require('cors');
var app          = express();

var indexRouter  = require('./routes/index');
var users   	 = require('./routes/users');

// view engine setup
app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Use the set() method to store values
app.set('port', process.env.PORT || 5005)

app.use(logger('dev'));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
app.get('/users', users.list );
app.get('/users/add', users.add)
app.get('/users/delete/:id', users.del)
app.get('/users/edit/:id', users.edit)

app.post('/users/add', users.save)
app.post('/users/edit/:id', users.update)

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
  // res.render('error');
});

app.listen(app.settings.port, function () {
console.log('Server is running on Port 5005. Press CTRL+C to stop server.')
})

module.exports = {
	app
};

