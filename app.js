let createError = require('http-errors');
let httpStatus = require('http-status');
let express = require('express');
let path = require('path');
let cors = require('cors');

let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('dotenv').config();
const { errorConverter, errorHandler } = require('./middleware/error');
const ApiError = require('./utils/ApiError');

var bodyParser = require('body-parser');

let indexRouter = require('./routes');
const { checkAuth } = require('./middleware/auth.middleware');

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// const routes = require('./routes/v1');


let app = express();

app.use('/assets', express.static(__dirname + "/assets"));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(fileUpload());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
// app.use('/users', usersRouter);

// v1 api routes
// app.use('/v1', routes);

app.use(checkAuth);
// app.use('/myspots', myspotsRouter);






// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
//riderapp@2022
module.exports = app;
