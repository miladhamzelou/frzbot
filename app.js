var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var jsonfile = require('jsonfile');
var core = require('./core');
var config = jsonfile.readFileSync('./config.json');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

core.init();

app.post(config[app.get('env')].url.rec, function (req, res) {
  res.send('ok');
  console.log(req.body);
  var update = req.body;
  core.proccessUpdate(update);
});

module.exports = app;
