const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const index = require('./routes/index');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://angulardyma:123123123@localhost/dyma?retryWrites=true&w=majority', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Connexion opened to mongodb!');
    }
});

app.use(index);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;