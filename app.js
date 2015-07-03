var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


var recURL;
var sndURL;

if (app.get('env') === 'dev') {
  recURL = '/';
  sndURL = 'https://localhost:3001/';

} else if (app.get('env') === 'pro') {
  recURL = '/120271554:AAGYxfM50KWuaSkBXT_HRnmmq9iw8YrOcgc';
  sndURL = 'https://api.telegram.org/bot120271554:AAGYxfM50KWuaSkBXT_HRnmmq9iw8YrOcgc/';
}

app.post(recURL, function (req, res) {
  var update = req.body;
  res.send('ok');

  var data = {

  };
  //data['chat_id'] = update.message.chat.id;
  //data['text'] = 'Hello ' + update.message.from['first_name'];
  request.post(sndURL + 'sendMessage').form(data);
});

module.exports = app;