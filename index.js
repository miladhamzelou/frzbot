'use strict';

const telegram = require('telegram-bot-api');
var core = require('./core');

const api = new telegram({
  token: '120271554:AAGYxfM50KWuaSkBXT_HRnmmq9iw8YrOcgc',
  updates: {
    enabled: true
  }
});

api.on('message', function(message)
{
  if(!message) {
    return;
  }

  core.proccessUpdate({
    message: message
  });
});





