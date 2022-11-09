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

const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
const dbName = 'my_new_dataBase'; 
const dbUrl = 'mongodb+srv://test:<password>@cluster0.tefstrq.mongodb.net/?retryWrites=true&w=majority'

// connecting to the database 
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}); 
module.exports = app;
