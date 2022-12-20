var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var alarmsRouter = require("./routes/alarms");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use("/alarms", alarmsRouter);

module.exports = app;

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = `mongodb+srv://test:admin@clustertest.ok891hn.mongodb.net/testbdd?retryWrites=true&w=majority`; 

const connectionParams = {
    useNewUrlParser: true,
}

// connecting to the database 
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

;