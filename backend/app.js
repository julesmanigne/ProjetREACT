var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;

const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
const DataJD = 'DataJD'; 
const dbUrl = 'mongodb+srv://test:admin@cluster0.tefstrq.mongodb.net/${DataJD}?retryWrites=true&w=majority'

// connecting to the database 
console.log(dbUrl); 
mongoose.connect(dbUrl); 