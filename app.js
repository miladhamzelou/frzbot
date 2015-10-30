var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var core = require('./core');
var config = jsonfile.readFileSync('./config.json');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.post(config[app.get('env')].url.rec, function (req, res) {
  res.send('ok');
  var update = req.body;
  core.proccessUpdate(update);
});

module.exports = app;
