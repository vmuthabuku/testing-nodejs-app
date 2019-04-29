const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require("./config").get(process.env.NODE_ENV)

mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE, { useNewUrlParser: true })


const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// require endpoints
require('./routes')(app);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is active")
})

module.exports = app
