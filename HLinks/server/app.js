require('dotenv').config();
require("./routes/conn/Conn")
var createError = require('http-errors');
var express = require('express');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Registeration = require('./routes/Registration');
const Otp_verify = require('./routes/Otp_verify');
const Login_1 = require('./routes/Login_1');
const Receive_social = require('./routes/Receive_social');
const Auth = require('./routes/Auth/Auth');
const SendSocialData = require('./routes/SendSocialData');
const ImageUpload = require('./routes/ImageUpload');

const SendDashboardData = require('./routes/SendDashboardData');
const RemoveSocialData = require('./routes/removeSocialData');

var app = express();

// view engine setup
var corsOptions = {
  origin: 'https://hlinks.netlify.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.json({ limit: '10mb' })); // Increase the limit to handle large images

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/signup', Registeration);
app.use('/api/verify-otp', Otp_verify);
app.use('/api/login', Login_1);
/* GET users listing. */
app.use('/api/social-links',Auth, Receive_social);
app.use('/api/:vanityLink', SendSocialData);

app.use('/api/upload',Auth, ImageUpload);
app.use('/api/getSocialData',Auth, SendDashboardData);
app.use('/api/removeSocialData',Auth, RemoveSocialData);






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
